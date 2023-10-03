import prisma from "@/config/db";

export const findReferrers = async ({ queriedUrl }: { queriedUrl: string }) => {
  const result = await prisma.pageView.groupBy({
    by: ["referrer"],
    _count: {
      referrer: true,
    },
    orderBy: {
      _count: {
        referrer: "desc",
      },
    },
    where: {
      referrer: {
        not: null,
      },
      baseUrl: queriedUrl,
    },
  });
  return result;
};
