import { findTopStayed } from "@/models/dashboard/overview";

export const retrieveTopStayed = async (limit: number) => {
  const retrievedTopStayed = await findTopStayed(limit);
  return retrievedTopStayed.map((topVisited) => ({
    ...topVisited,
    duration: Number(topVisited.duration),
  }));
};
