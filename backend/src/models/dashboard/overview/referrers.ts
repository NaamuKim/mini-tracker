import prisma from "@/config/db";

export const findReferrers = async () => {
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
    },
  });
  console.log(result);
  return result;
};
