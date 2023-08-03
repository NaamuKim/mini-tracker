import { PoolConnection } from "mysql2/promise";

declare module "express-serve-static-core" {
  export interface Request {
    dbConnection: PoolConnection;
  }
}
