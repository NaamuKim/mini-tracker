import { PageView, Prisma } from "@prisma/client";
import prisma from "@/config/db";
import { PageTransitionCreateInputWithoutFromTo } from "@/types/pageTransition";

export const insertPageTransition = ({
  pageTransitionInfo,
  fromPageViewId,
  toPageViewInfo,
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
      create: toPageViewInfo,
    },
  };
  return prisma.pageTransition.create({
    data,
  });
};
