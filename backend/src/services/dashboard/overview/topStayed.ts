import { findTopStayed } from "@/models/dashboard/overview/topStayed";

export const retrieveTopStayed = async ({
  limit,
  queriedUrl,
}: {
  limit: number;
  queriedUrl: string;
}) => {
  const retrievedTopStayed = await findTopStayed({
    limit,
    queriedUrl,
  });
  return retrievedTopStayed.map((topVisited) => ({
    ...topVisited,
    duration: Number(topVisited.duration),
  }));
};
