import prisma from "../config/db";
import { Prisma } from "@prisma/client";

type CreatePageViewInput = Omit<Prisma.PageViewCreateInput, "session">;
export const createPageView = (
  pageViewCreateInput: CreatePageViewInput,
  sessionId: string,
) => {
  const data: Prisma.PageViewCreateInput = {
    ...pageViewCreateInput,
    session: {
      connect: {
        id: sessionId,
      },
    },
  };
  return prisma.pageView.create({
    data,
  });
};
