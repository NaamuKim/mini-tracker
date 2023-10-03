import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@/constant/HTTP";
import { VisitorsQueryParamsDTO } from "@/types/DTO/dashboard/overview";

export const validateVisitorsQueryParam = (
  req: Request<VisitorsQueryParamsDTO>,
  res: Response,
  next: NextFunction,
) => {
  const {
    startDate,
    endDate,
    interval = "day",
    sort = "asc",
    limit = "50",
    queriedUrl,
  } = req.query;

  if (
    !startDate ||
    !endDate ||
    typeof startDate !== "string" ||
    typeof endDate !== "string"
  ) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid date format" });
  }

  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  if (
    Number.isNaN(parsedStartDate.getTime()) ||
    Number.isNaN(parsedEndDate.getTime())
  ) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid date" });
  }

  if (!["day", "month"].includes(interval as string)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid interval" });
  }

  if (!["asc", "desc"].includes(sort as string)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid sort" });
  }

  const parsedLimit = Number(limit);
  if (Number.isNaN(parsedLimit)) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid limit" });
  }

  req.validatedQueryParams = {
    startDate: parsedStartDate,
    endDate: parsedEndDate,
    interval,
    sort,
    limit: parsedLimit,
    queriedUrl,
  };
  next();
};
