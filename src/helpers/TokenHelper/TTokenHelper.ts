export type TTokenHelper = {
  generateToken: (data: string | object) => string;
  decode: <T = unknown>(token: string) => T;
  validate: (token: string) => boolean;
};
