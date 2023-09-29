import prisma from "@/config/db";

export const findAppsByWord = async (word: string) => {
  const apps = prisma.pageView.findMany({
    where: {
      baseUrl: {
        contains: word,
      },
    },
    select: {
      baseUrl: true,
    },
  });
  return apps;
};

export const findTop5Apps = async () => {
  const top5Apps = await prisma.$queryRaw<
    Array<{
      baseUrl: string;
      count: number;
    }>
  >`
    SELECT baseUrl, COUNT(*) as count 
    FROM PageView 
    GROUP BY baseUrl 
    ORDER BY count DESC 
    LIMIT 5;
  `;

  return top5Apps;
};
