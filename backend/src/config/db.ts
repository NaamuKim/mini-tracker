import mysql from "mysql2/promise";
import { mySqlConfig } from "../env/env";

export const pool = mysql.createPool(mySqlConfig);
