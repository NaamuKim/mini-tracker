import prisma from "@/config/db";

export const findTopStayed = async ({
  limit,
  queriedUrl,
}: {
  limit: number;
  queriedUrl: string;
}) => {
  const result = await prisma.$queryRaw<
    Array<{
      pageLocation: string;
      duration: bigint;
    }>
  >`
    SELECT
        pageLocation,
        SUM(TIMESTAMPDIFF(SECOND, entryTime, COALESCE(exitTime, DATE_ADD(entryTime, INTERVAL 10 MINUTE)))) / COUNT(*) as duration
    FROM PageView
    WHERE baseUrl = ${queriedUrl}
    GROUP BY pageLocation
    ORDER BY duration DESC
    LIMIT ${limit};
  `;

  return result;
};
