import { findTopVisited } from "@/models/dashboard/overview";

export const retrieveTopVisited = async (limit: number) => {
  const retrievedTopVisited = await findTopVisited(limit);
  return retrievedTopVisited.map(
    ({ pageLocation, _count: { pageLocation: count } }) => ({
      pageLocation,
      count,
    }),
  );
};
