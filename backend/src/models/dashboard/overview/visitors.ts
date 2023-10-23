import { VisitorsQueryParamsDTO } from "@/types/DTO/dashboard/overview";
import { Prisma } from "@prisma/client";
import prisma from "@/config/db";

export const findVisitors = async ({
  endDate,
  sort,
  queriedUrl,
}: VisitorsQueryParamsDTO): Promise<
  Array<{
    date: Date;
    count: number;
  }>
> => {
  const sortingClause =
    sort === "asc"
      ? Prisma.sql`ORDER BY RankedDates.entryTime ASC`
      : Prisma.sql`ORDER BY RankedDates.entryTime DESC`;

  const visitors = await prisma.$queryRaw<
    Array<{
      date: Date;
      count: bigint;
    }>
  >`
      WITH RankedDates AS (
          SELECT
              DATE(entryTime) as entryTime,
              RANK() OVER (ORDER BY DATE(entryTime) DESC) as rnk
          FROM PageView
          WHERE entryTime BETWEEN ${"2023-09-01"} AND ${endDate} AND baseUrl = ${queriedUrl}
          GROUP BY DATE(entryTime)
      )

      SELECT
          RankedDates.entryTime as date,
          COALESCE(COUNT(PageView.entryTime), 0) as count
      FROM RankedDates
               LEFT JOIN PageView ON DATE(PageView.entryTime) = RankedDates.entryTime AND baseUrl = ${queriedUrl}
      WHERE RankedDates.rnk <= 7
      GROUP BY RankedDates.entryTime
          ${sortingClause}
  `;

  return visitors.map((visitor) => ({
    ...visitor,
    count: Number(visitor.count),
  }));
};
