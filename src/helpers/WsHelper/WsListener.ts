import { TDataCallback, TListener, TOnCall, TUseCallback } from './TWsHelper';

export class WsListener implements TListener {
  private calls: (TOnCall | TUseCallback)[] = [];

  on(event: string, ...callbacks: TDataCallback[]) {
    this.calls.push({ event, callbacks });
  }

  private useCallback(callback: TUseCallback) {
    this.calls.push(callback);
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

  getCalls() {
    return Array.from(this.calls);
  }
}
