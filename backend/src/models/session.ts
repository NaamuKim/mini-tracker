import prisma from "@/config/db";
import { Prisma } from "@prisma/client";

export const createSession = ({
  userAgent,
  appVersion,
  baseUrl,
}: Prisma.SessionCreateInput) => {
  const session = prisma.session.create({
    data: { userAgent, appVersion, baseUrl },
  });
  return session;
};
