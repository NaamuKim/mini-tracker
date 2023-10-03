import { findTopVisited } from "@/models/dashboard/overview/topVisited";

export const retrieveTopVisited = async ({
  limit,
  queriedUrl,
}: {
  limit: number;
  queriedUrl: string;
}) => {
  const retrievedTopVisited = await findTopVisited({
    limit,
    queriedUrl,
  });
  return retrievedTopVisited.map(
    ({ pageLocation, _count: { pageLocation: count } }) => ({
      pageLocation,
      count,
    }),
  );
};
