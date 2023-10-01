import { findTopVisited } from "@/models/dashboard/overview/topVisited";

export const retrieveTopVisited = async (limit: number) => {
  const retrievedTopVisited = await findTopVisited(limit);
  return retrievedTopVisited.map(
    ({ pageLocation, _count: { pageLocation: count } }) => ({
      pageLocation,
      count,
    }),
  );
};
