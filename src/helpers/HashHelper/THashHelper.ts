export type THashHelper = {
  hash: (content: string, salt: number | string) => Promise<string>;
  compare: (content: string, hash: string) => Promise<boolean>;
};
