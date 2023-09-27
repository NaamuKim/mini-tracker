import { findTopStayed, findVisitors } from "@/models/dashboard/overview";
import { VisitorsQueryParamsDTO } from "@/types/DTO/dashboard/overview";

export const retrieveVisitors = ({
  startDate,
  endDate,
  interval,
  limit,
  sort,
}: VisitorsQueryParamsDTO) => {
  const retrievedVisitors = findVisitors({
    startDate,
    endDate,
    sort,
    interval,
    limit,
  });
  return retrievedVisitors;
};

export const retrieveTopStayed = async (limit: number) => {
  const retrievedTopVisited = await findTopStayed(limit);
  return retrievedTopVisited.map((topVisited) => ({
    ...topVisited,
    duration: Number(topVisited.duration),
  }));
};
