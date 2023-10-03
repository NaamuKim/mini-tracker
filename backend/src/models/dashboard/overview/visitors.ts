import { VisitorsQueryParamsDTO } from "@/types/DTO/dashboard/overview";
import { Prisma } from "@prisma/client";
import prisma from "@/config/db";

export const findVisitors = async ({
  startDate,
  endDate,
  sort,
  queriedUrl,
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
    WHERE entryTime BETWEEN ${startDate} AND ${endDate} AND baseUrl = ${queriedUrl}
    GROUP BY DATE(entryTime) 
    ${sortingClause}
  `;

  return visitors.map((visitor) => ({
    ...visitor,
    count: Number(visitor.count),
  }));
};
