/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it } from 'node:test';
import assert from 'assert';

import socketio from 'socket.io-client';
import { SocketIoHelper } from './SocketIoHelper';
import { WsListener } from './WsListener';

const PORT = 4000;

const wait = async (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

describe('SocketIoHelper', { concurrency: 1 }, () => {
  it(`
     Give that a callback function is passed on "onConnect"
     When N connections are made
     The callback function must be executed N times
  `, async () => {
    const wsHelper = new SocketIoHelper();

    let connectionsCount = 0;
    const expectedConnectionsCount = Math.round(
      Math.max(Math.random() * 10, 2)
    );

    wsHelper.onConnect(() => {
      connectionsCount += 1;
    });

    wsHelper.start(PORT);

    for (let i = 0; i < expectedConnectionsCount; i++) {
      const io = socketio(`ws://localhost:${PORT}`);
      await wait(50);
      assert.equal(io.connected, true);
    }

    await wait(50);
    wsHelper.close();
    assert.equal(connectionsCount, expectedConnectionsCount);
  });

  it(`
     Give that a callback function is passed on "onDisconnect"
     When N disconnections are made
     The callback function must be executed N times
  `, async () => {
    const wsHelper = new SocketIoHelper();

    let disconnectionsCount = 0;
    const expectedDisconnectionsCount = Math.round(
      Math.max(Math.random() * 10, 2)
    );

    wsHelper.onDisconnect(() => {
      disconnectionsCount += 1;
    });

    wsHelper.start(PORT);

    for (let i = 0; i < expectedDisconnectionsCount; i++) {
      const io = socketio(`ws://localhost:${PORT}`);
      await wait(50);
      assert.equal(io.connected, true);

      io.disconnect();
      await wait(50);
      assert.equal(io.connected, false);
    }

    await wait(50);
    wsHelper.close();
    assert.equal(disconnectionsCount, expectedDisconnectionsCount);
  });

  it(`
    Given that an event is registered on method "on"
    When occur an emition of that event
    The defined callback function must be executed
  `, async () => {
    const wsHelper = new SocketIoHelper();
    const event = 'eventKey';

    let called = false;
    wsHelper.on(event, () => {
      called = true;
    });

    wsHelper.start(PORT);

    const io = socketio(`ws://localhost:${PORT}`);
    io.emit(event);

    await wait(50);
    wsHelper.close();
    assert.equal(called, true);
  });

  it(`
    Given that an event is registered on method "on"
    When occur an emition of that event with parameters
    The defined callback function must be executed with the passed parameters
  `, async () => {
    const wsHelper = new SocketIoHelper();
    const event = 'eventKey';
    const params = [1, 'a', { a: 1 }, [1, 2, 3]];

    let receivedParams = undefined as undefined | any[];
    wsHelper.on(event, (...params) => {
      receivedParams = params;
    });

    wsHelper.start(PORT);

    const io = socketio(`ws://localhost:${PORT}`);
    io.emit(event, ...params);

    await wait(50);
    wsHelper.close();
    assert.deepStrictEqual(receivedParams, params);
  });

  it(`
    Given that an event is registered on method "on" with multiple callback functions
    When occur an emition of that event
    The callback functions must be executed on sequence
  `, async () => {
    const wsHelper = new SocketIoHelper();
    const event = 'eventKey';
    let calls = 0;

    wsHelper.on(
      event,
      () => {
        calls += 1;
      },
      () => {
        assert.equal(calls, 1);
        calls += 1;
      },
      () => {
        assert.equal(calls, 2);
        calls += 1;
      },
      () => {
        assert.equal(calls, 3);
        calls += 1;
      }
    );

    wsHelper.start(PORT);

    const io = socketio(`ws://localhost:${PORT}`);
    io.emit(event);

    await wait(50);
    wsHelper.close();
    assert.equal(calls, 4);
  });

  it(`
    Given that an event is registered on method "on" with multiple callback functions
    When occur an emition of that event AND one callback throws an error
    The execution chain must be stopped
  `, async () => {
    const wsHelper = new SocketIoHelper();
    const event = 'eventKey';
    let calls = 0;

    wsHelper.on(
      event,
      () => {
        calls += 1;
      },
      () => {
        assert.equal(calls, 1);
        calls += 1;
      },
      () => {
        assert.equal(calls, 2);
        calls += 1;
        throw new Error();
      },
      () => {
        assert.equal(calls, 3);
        calls += 1;
      }
    );

    wsHelper.start(PORT);

    const io = socketio(`ws://localhost:${PORT}`);
    io.emit(event);

    await wait(50);
    wsHelper.close();
    assert.equal(calls, 3);
  });

  it(`
    Given that an event is emitted on method "emit"
    The client must be able to listen the event
  `, async () => {
    const wsHelper = new SocketIoHelper();
    const event = 'eventKey';

    wsHelper.start(PORT);
    wsHelper.onConnect(() => {
      wsHelper.emit(event);
    });

    const io = socketio(`ws://localhost:${PORT}`);

    let called = false;
    io.on(event, () => {
      called = true;
    });

    await wait(50);
    wsHelper.close();
    assert.equal(called, true);
  });

  it(`
    Given that the method "close" is executed
    The client must not be able to connect
  `, async () => {
    const wsHelper = new SocketIoHelper();

    wsHelper.start(PORT);
    await wait(50);
    wsHelper.close();

    const io = socketio(`ws://localhost:${PORT}`);
    await wait(50);

    assert.equal(io.connected, false);
  });

  it(`
    Given that a callback function is passed on method "use"
    When an event is emmited
    The method passed in "use" must be executed before the methods passed in "on"
  `, async () => {
    const wsHelper = new SocketIoHelper();
    const event = 'eventKey';

    let middlewareExecuted = false;
    let ok = false;

    wsHelper.use((next) => {
      middlewareExecuted = true;
      next();
    });

    wsHelper.on(event, () => {
      ok = middlewareExecuted === true;
    });

    wsHelper.start(PORT);

    const io = socketio(`ws://localhost:${PORT}`);
    io.emit(event);

    await wait(50);
    wsHelper.close();
    assert.equal(ok, true);
  });

  it(`
    Given that a callback function is passed on method "use"
    When an event is emmited
    The following method passed in "on" must not be executed if "next" isn't called
  `, async () => {
    const wsHelper = new SocketIoHelper();
    const event = 'eventKey';

    let middlewareExecuted = false;
    let onExecuted = false;

    wsHelper.use(() => {
      middlewareExecuted = true;
    });

    wsHelper.on(event, () => {
      onExecuted = true;
    });

    wsHelper.start(PORT);

    const io = socketio(`ws://localhost:${PORT}`);
    io.emit(event);

    await wait(50);
    wsHelper.close();
    assert.equal(middlewareExecuted, true);
    assert.equal(onExecuted, false);
  });

  it(`
    Given that an event is registered on method "on" in a listener
    When occur an emition of that event
    The defined callback function must be executed
  `, async () => {
    const wsHelper = new SocketIoHelper();
    const listener = new WsListener();
    const event = 'eventKey';

    let called = false;
    listener.on(event, () => {
      called = true;
    });

    wsHelper.use(listener);
    wsHelper.start(PORT);

    const io = socketio(`ws://localhost:${PORT}`);
    io.emit(event);

    await wait(50);
    wsHelper.close();
    assert.equal(called, true);
  });

  it(`
    Given that an event is registered on method "on" in a listener
    When occur an emition of that event with parameters
    The defined callback function must be executed with the passed parameters
  `, async () => {
    const wsHelper = new SocketIoHelper();
    const listener = new WsListener();

    const event = 'eventKey';
    const params = [1, 'a', { a: 1 }, [1, 2, 3]];

    let receivedParams = undefined as undefined | any[];
    listener.on(event, (...params) => {
      receivedParams = params;
    });

    wsHelper.use(listener);
    wsHelper.start(PORT);

    const io = socketio(`ws://localhost:${PORT}`);
    io.emit(event, ...params);

    await wait(50);
    wsHelper.close();
    assert.deepStrictEqual(receivedParams, params);
  });

  it(`
    Given that an event is registered on method "on" with multiple callback functions in a listener
    When occur an emition of that event
    The callback functions must be executed on sequence
  `, async () => {
    const wsHelper = new SocketIoHelper();
    const listener = new WsListener();

    const event = 'eventKey';
    let calls = 0;

    listener.on(
      event,
      () => {
        calls += 1;
      },
      () => {
        assert.equal(calls, 1);
        calls += 1;
      },
      () => {
        assert.equal(calls, 2);
        calls += 1;
      },
      () => {
        assert.equal(calls, 3);
        calls += 1;
      }
    );

    wsHelper.use(listener);
    wsHelper.start(PORT);

    const io = socketio(`ws://localhost:${PORT}`);
    io.emit(event);

    await wait(50);
    wsHelper.close();
    assert.equal(calls, 4);
  });

  it(`
    Given that an event is registered on method "on" with multiple callback functions in a listener
    When occur an emition of that event AND one callback throws an error
    The execution chain must be stopped
  `, async () => {
    const wsHelper = new SocketIoHelper();
    const listener = new WsListener();

    const event = 'eventKey';
    let calls = 0;

    listener.on(
      event,
      () => {
        calls += 1;
      },
      () => {
        assert.equal(calls, 1);
        calls += 1;
      },
      () => {
        assert.equal(calls, 2);
        calls += 1;
        throw new Error();
      },
      () => {
        assert.equal(calls, 3);
        calls += 1;
      }
    );

    wsHelper.use(listener);
    wsHelper.start(PORT);

    const io = socketio(`ws://localhost:${PORT}`);
    io.emit(event);

    await wait(50);
    wsHelper.close();
    assert.equal(calls, 3);
  });

  it(`
    Given that a callback function is passed on method "use" in a listener
    When an event is emmited
    The method passed in "use" must be executed before the methods passed in "on"
  `, async () => {
    const wsHelper = new SocketIoHelper();
    const listener = new WsListener();

    const event = 'eventKey';

    let middlewareExecuted = false;
    let ok = false;

    listener.use((next) => {
      middlewareExecuted = true;
      next();
    });

    listener.on(event, () => {
      ok = middlewareExecuted === true;
    });

    wsHelper.use(listener);
    wsHelper.start(PORT);

    const io = socketio(`ws://localhost:${PORT}`);
    io.emit(event);

    await wait(50);
    wsHelper.close();
    assert.equal(ok, true);
  });

  it(`
    A listener should be able to use another listener
  `, async () => {
    const wsHelper = new SocketIoHelper();
    const listener = new WsListener();
    const listener2 = new WsListener();
    const event = 'eventKey';

    let called = false;
    listener.on(event, () => {
      called = true;
    });

    listener2.use(listener);

    wsHelper.use(listener2);
    wsHelper.start(PORT);

    const io = socketio(`ws://localhost:${PORT}`);
    io.emit(event);

    await wait(50);
    wsHelper.close();
    assert.equal(called, true);
  });
});
