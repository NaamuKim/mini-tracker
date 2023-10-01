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

export const findRecentReferrerBySessionId = async (
  sessionId: string,
): Promise<string | null> => {
  const { referrer } = (await prisma.pageView.findFirst({
    where: {
      sessionId,
      referrer: {
        not: null,
      },
    },
    orderBy: {
      entryTime: "desc",
    },
  })) || { referrer: null };

  return referrer;
};

export const updateFromPageExitTime = async ({
  fromPageViewId,
  exitTime,
}: {
  fromPageViewId: number;
  exitTime?: Date;
}) => {
  if (!exitTime) return;

  const hasExitTimePageView = prisma.pageView.update({
    where: {
      id: fromPageViewId,
    },
    data: {
      exitTime,
    },
  });
  return hasExitTimePageView;
};
