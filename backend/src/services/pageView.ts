import { PageView } from "@prisma/client";
import { createPageView } from "../models/pageView";
import BadRequestError from "../errors/BadRequestError";

export const handlePageView = async ({
  pageLocation,
  baseUrl,
  entryTime,
  referrer,
  sessionId,
}: Partial<PageView> & {
  sessionId: string;
  baseUrl: string;
}) => {
  if (!pageLocation) {
    throw new BadRequestError("pageLocation is required");
  }
  await createPageView(
    {
      pageLocation,
      baseUrl,
      entryTime,
      referrer,
    },
    sessionId,
  );
};
