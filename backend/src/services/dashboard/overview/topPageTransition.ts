import { findTopPageTransitions } from "@/models/dashboard/overview/topPageTransitions";

export const retrieveTopPageTransitions = async ({
  limit = 5,
  queriedUrl,
}: {
  limit?: number;
  queriedUrl: string;
}) => {
  const retrievedTopPageTransitions = await findTopPageTransitions({
    limit,
    queriedUrl,
  });
  return retrievedTopPageTransitions.map(
    ({ fromPageLocation, toPageLocation, count }) => ({
      from: fromPageLocation,
      to: toPageLocation,
      count: Number(count),
    }),
  );
};
