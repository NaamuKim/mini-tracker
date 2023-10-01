import { PageView } from "@prisma/client";
import { insertPageTransition } from "@/models/sdk/pageTransition";
import {
  findRecentPageViewBySession,
  findRecentReferrerBySessionId,
  updateFromPageExitTime,
} from "@/models/sdk/pageView";
import { PageTransitionCreateInputWithoutFromTo } from "@/types/pageTransition";

export const registerPageTransition = async (
  sessionId: PageView["sessionId"],
  toPageViewInfo: PageView,
  pageTransitionInfo: PageTransitionCreateInputWithoutFromTo,
  fromPageExitTime?: Date,
) => {
  const [fromPageViewId, recentReferrer] = await Promise.all([
    findRecentPageViewBySession(sessionId),
    getReferrer(sessionId, toPageViewInfo),
  ]);

  await updateFromPageExitTime({
    fromPageViewId,
    exitTime: fromPageExitTime,
  });

  const pageTransition = await insertPageTransition({
    pageTransitionInfo,
    fromPageViewId,
    toPageViewInfo: {
      ...toPageViewInfo,
      referrer: recentReferrer,
      sessionId,
    },
  });
  return pageTransition;
};

const getReferrer = async (
  sessionId: string,
  { referrer, baseUrl }: PageView,
): Promise<string | null> => {
  if (!referrer || referrer.includes(baseUrl)) {
    return findRecentReferrerBySessionId(sessionId);
  }

  return Promise.resolve(referrer);
};
