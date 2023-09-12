class BadRequestError extends Error {
  constructor(
    public message: string,
    public errorCode = 400,
  ) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export default BadRequestError;
