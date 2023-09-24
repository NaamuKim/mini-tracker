declare module 'express-serve-static-core' {
  export interface Request<T = unknown> {
    validatedQueryParams: T;
  }
}
