import crypto from "crypto";

export type LoginInfo = {
  userId: string;
  password: string;
};

export const hashLoginInfo = ({ userId, password }: LoginInfo): string => {
  const hash = crypto.createHash("sha256");
  hash.update(userId + password);
  return hash.digest("hex");
};
