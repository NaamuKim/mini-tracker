import { Interval, Sort } from "@/types/DTO/common";

export type VisitorsQueryParamsDTO = {
  startDate: Date;
  endDate: Date;
  interval: Interval;
  sort: Sort;
  limit: number;
  queriedUrl: string;
};
