import prisma from "@/config/db";
import { Prisma } from "@prisma/client";
import { VisitorsQueryParamsDTO } from "@/types/DTO/dashboard/overview";

export const findVisitors = async ({
  startDate,
  endDate,
  sort,
}: VisitorsQueryParamsDTO): Promise<
  Array<{
    entryTime: Date;
    count: number;
  }>
> => {
  const sortingClause =
    sort === "asc"
      ? Prisma.sql`ORDER BY Date(entryTime) ASC`
      : Prisma.sql`ORDER BY Date(entryTime) DESC`;

  const visitors = await prisma.$queryRaw<
    Array<{
      entryTime: Date;
      count: bigint;
    }>
  >`
    SELECT DATE(entryTime) as date, COUNT(*) as count 
    FROM PageView 
    WHERE entryTime BETWEEN ${startDate} AND ${endDate} 
    GROUP BY DATE(entryTime) 
    ${sortingClause}
  `;

  return visitors.map((visitor) => ({
    ...visitor,
    count: Number(visitor.count),
  }));
};

export const findTopStayed = async (limit: number) => {
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
    GROUP BY pageLocation
    ORDER BY duration DESC
    LIMIT ${limit};
  `;

  return result;
};

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
