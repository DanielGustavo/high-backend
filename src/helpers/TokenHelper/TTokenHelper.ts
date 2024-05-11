export type TTokenHelper = {
  generateToken: (data: string | object) => string;
  decode: <T = unknown>(token: string, hasBearer?: boolean) => T;
  validate: (token: string) => boolean;
};
