import {
  findTopStayed,
  findTopVisited,
  findVisitors,
} from "@/models/dashboard/overview";
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
  const retrievedTopStayed = await findTopStayed(limit);
  return retrievedTopStayed.map((topVisited) => ({
    ...topVisited,
    duration: Number(topVisited.duration),
  }));
};

export const retrieveTopVisited = async (limit: number) => {
  const retrievedTopVisited = await findTopVisited(limit);
  return retrievedTopVisited.map(
    ({ pageLocation, _count: { pageLocation: count } }) => ({
      pageLocation,
      count,
    }),
  );
};
