import { PageView } from "@prisma/client";
import { insertPageView } from "@/models/sdk/pageView";
import BadRequestError from "@/errors/BadRequestError";

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
  await insertPageView(
    {
      pageLocation,
      baseUrl,
      entryTime,
      referrer,
    },
    sessionId,
  );
};
