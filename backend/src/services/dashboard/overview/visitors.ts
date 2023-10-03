import { VisitorsQueryParamsDTO } from "@/types/DTO/dashboard/overview";
import { findVisitors } from "@/models/dashboard/overview/visitors";

export const retrieveVisitors = ({
  startDate,
  endDate,
  interval,
  limit,
  sort,
  queriedUrl,
}: VisitorsQueryParamsDTO) => {
  const retrievedVisitors = findVisitors({
    startDate,
    endDate,
    sort,
    interval,
    limit,
    queriedUrl,
  });
  return retrievedVisitors;
};
