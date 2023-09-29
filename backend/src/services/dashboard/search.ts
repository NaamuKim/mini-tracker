import { findAppsByWord, findTop5Apps } from "@/models/dashboard/search";

export const retrieveWordIncludedApp = async (word?: string) => {
  if (!word) {
    const top5Apps = await findTop5Apps();
    return [...new Set(top5Apps.map(({ baseUrl }) => baseUrl))].map(
      (baseUrl) => ({ baseUrl }),
    );
  }

  const apps = await findAppsByWord(word);
  return [...new Set(apps.map(({ baseUrl }) => baseUrl))].map((baseUrl) => ({
    baseUrl,
  }));
};
