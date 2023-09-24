import prisma from "@/config/db";
import { Prisma } from "@prisma/client";

export const createSession = ({
  os,
  device,
  baseUrl,
}: Prisma.SessionCreateInput) => {
  const session = prisma.session.create({
    data: { os, device, baseUrl },
  });
  return session;
};
