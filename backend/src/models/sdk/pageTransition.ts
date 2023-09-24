import { PageView, Prisma } from "@prisma/client";
import prisma from "@/config/db";
import { PageTransitionCreateInputWithoutFromTo } from "@/types/pageTransition";

export const insertPageTransition = ({
  pageTransitionInfo,
  fromPageViewId,
  toPageViewInfo: { baseUrl, pageLocation, entryTime, referrer, sessionId },
}: {
  pageTransitionInfo: PageTransitionCreateInputWithoutFromTo;
  fromPageViewId: PageView["id"];
  toPageViewInfo: Prisma.PageViewUncheckedCreateWithoutToTransitionsInput;
}) => {
  const data: Prisma.PageTransitionCreateInput = {
    ...pageTransitionInfo,
    fromPageView: {
      connect: {
        id: fromPageViewId,
      },
    },
    toPageView: {
      create: {
        baseUrl,
        pageLocation,
        entryTime,
        referrer,
        sessionId,
      },
    },
  };
  return prisma.pageTransition.create({
    data,
  });
};
