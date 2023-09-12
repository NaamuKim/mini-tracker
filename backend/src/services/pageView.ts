import { PageView } from "@prisma/client";
import { createPageView } from "../models/pageVIew";

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
    throw new Error("pageLocation is required");
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
