import prisma from "@/config/db";

export const findTopPageTransitions = async ({
  limit,
  queriedUrl,
}: {
  limit: number;
  queriedUrl: string;
}) => {
  const result = await prisma.$queryRaw<
    Array<{
      fromPageLocation: string;
      toPageLocation: string;
      count: bigint;
    }>
  >`
      WITH JoinedPageViews AS (
          SELECT
              pt.id AS transitionId,
              pt.fromPageViewId,
              pt.toPageViewId,
              pv1.pageLocation AS fromPageLocation,
              pv2.pageLocation AS toPageLocation
          FROM
              PageTransition AS pt
                  JOIN
              PageView AS pv1
              ON
                  pt.fromPageViewId = pv1.id
                  JOIN
              PageView AS pv2
              ON
                  pt.toPageViewId = pv2.id
          WHERE pv1.pageLocation <> pv2.pageLocation 
            AND pv1.baseUrl = ${queriedUrl}
            AND pv2.baseUrl = ${queriedUrl}
      )
      SELECT
          jp.fromPageLocation,
          jp.toPageLocation,
          COUNT(*) AS count
      FROM
          JoinedPageViews AS jp
      GROUP BY
          jp.fromPageLocation,
          jp.toPageLocation
      ORDER BY
          count DESC
      LIMIT
          ${limit}

  `;
  return result;
};
