import { Prisma } from "@prisma/client";
import prisma from "@/config/db";

type CreatePageViewInput = Omit<Prisma.PageViewCreateInput, "session">;
export const insertPageView = (
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

export const findRecentPageViewBySession = async (
  sessionId: string,
): Promise<number> => {
  const { id } = (await prisma.pageView.findFirst({
    where: {
      sessionId,
    },
    orderBy: {
      entryTime: "desc",
    },
  })) as { id: number };

  return id;
};
