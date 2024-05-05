type TQueryResult<T> = {
  rows: T[];
  rowCount: number;
};

export type TDatabaseHelper = {
  end: () => Promise<unknown>;
  query: <T = unknown>(
    query: string,
    params?: unknown[]
  ) => Promise<TQueryResult<T>>;
};
