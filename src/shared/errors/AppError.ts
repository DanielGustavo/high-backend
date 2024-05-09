export default class AppError {
  public code: number;

  public message: string;

  public constructor(errorCode: number, errorMessage: string) {
    this.code = errorCode;
    this.message = errorMessage;
  }
}
