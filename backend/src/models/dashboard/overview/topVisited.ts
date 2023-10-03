import prisma from "@/config/db";

export const findTopVisited = async ({
  limit,
  queriedUrl,
}: {
  limit: number;
  queriedUrl: string;
}) => {
  const result = await prisma.pageView.groupBy({
    by: ["pageLocation"],
    _count: {
      pageLocation: true,
    },
    orderBy: {
      _count: {
        pageLocation: "desc",
      },
    },
    where: {
      baseUrl: queriedUrl,
    },
    take: limit,
  });
  return result;
};
