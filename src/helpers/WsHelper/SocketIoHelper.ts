import { Server, Socket } from 'socket.io';
import {
  TClientCallback,
  TDataCallback,
  TListener,
  TUseCallback,
  TWsHelper,
} from './TWsHelper';
import { EventEmitter } from 'events';

export class SocketIoHelper implements TWsHelper {
  private io?: Server;
  private eventsObserver = new EventEmitter();

  start(port: number) {
    this.io = new Server({ cors: { origin: '*' } });

    const reservedEvents = ['connection', 'disconnect'];

    this.io?.on('connection', (client) => {
      this.eventsObserver.emit('connection', client);

      this.eventsObserver
        .eventNames()
        .filter((event) => {
          return typeof event === 'string' && !reservedEvents.includes(event);
        })
        .forEach((event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          client.on(event as string, (...args: any[]) => {
            this.eventsObserver.emit(event, ...args);
          });
        });

      client.on('disconnect', () => {
        this.eventsObserver.emit('disconnect', client);
      });
    });

    this.io?.listen(port);
  }

  onConnect<T>(callback: TClientCallback<T>) {
    this.eventsObserver.on('connection', callback);
  }

  onDisconnect<T>(callback: TClientCallback<T>) {
    this.eventsObserver.on('disconnect', callback);
  }

  on(event: string, ...callbacks: TDataCallback[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.eventsObserver.on(event, (...data: any[]) => {
      for (let i = 0; i < callbacks.length; i++) {
        const callback = callbacks[i];

        try {
          callback(...data);
        } catch {
          break;
        }
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: string, ...data: any[]) {
    this.io?.emit(event, ...data);
  }

  private useCallback(callback: TUseCallback) {
    this.onConnect<Socket>((client) => {
      client.use((_, next) => callback(next, client.handshake.query));
    });
  }

  private useListener(listener: TListener) {
    listener.getCalls().forEach((call) => {
      if (typeof call === 'function') {
        this.use(call);
      } else {
        this.on(call.event, ...call.callbacks);
      }
    });
  }

  use(middlewareHandler: TUseCallback | TListener) {
    if (typeof middlewareHandler === 'function') {
      this.useCallback(middlewareHandler);
    } else {
      this.useListener(middlewareHandler);
    }
  }

  close() {
    this.io?.close();
  }
}
