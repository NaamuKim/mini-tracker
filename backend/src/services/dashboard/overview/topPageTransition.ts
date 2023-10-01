import { findTopPageTransitions } from "@/models/dashboard/overview/topPageTransitions";

export const retrieveTopPageTransitions = async () => {
  const retrievedTopPageTransitions = await findTopPageTransitions();
  return retrievedTopPageTransitions.map(
    ({ fromPageLocation, toPageLocation, count }) => ({
      from: fromPageLocation,
      to: toPageLocation,
      count: Number(count),
    }),
  );
};
