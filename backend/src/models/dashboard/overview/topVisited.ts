import prisma from "@/config/db";

export const findTopVisited = async (limit: number) => {
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
    take: limit,
  });
  return result;
};
