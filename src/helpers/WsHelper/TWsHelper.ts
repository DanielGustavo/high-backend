/* eslint-disable @typescript-eslint/no-explicit-any */

export type TClient = {
  on: (event: string, callback: TDataCallback) => void;
};

export type TDataCallback = (...data: any[]) => void;
export type TUseCallback = (next: () => void, ...data: any[]) => void;
export type TClientCallback<T = TClient> = (client: T) => void;

export type TOnCall = {
  event: string;
  callbacks: TDataCallback[];
};

export type TListener = {
  on: (event: string, ...callbacks: TDataCallback[]) => void;
  use: (callback: TUseCallback | TListener) => void;
  getCalls: () => (TOnCall | TUseCallback)[];
};

export type TWsHelper = {
  on: (event: string, ...callbacks: TDataCallback[]) => void;
  onConnect: <T>(callback: TClientCallback<T>) => void;
  onDisconnect: <T>(callback: TClientCallback<T>) => void;
  use: (callback: TUseCallback | TListener) => void;
  start: (port: number) => void;
  emit: (event: string, ...data: any[]) => void;
  close: () => void;
};
