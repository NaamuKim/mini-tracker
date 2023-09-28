import { PageView } from "@prisma/client";
import { insertPageTransition } from "@/models/sdk/pageTransition";
import {
  findRecentPageViewBySession,
  insertPageExitTime,
} from "@/models/sdk/pageView";
import { PageTransitionCreateInputWithoutFromTo } from "@/types/pageTransition";

export const registerPageTransition = async (
  sessionId: PageView["sessionId"],
  toPageViewInfo: PageView,
  pageTransitionInfo: PageTransitionCreateInputWithoutFromTo,
  fromPageExitTime?: Date,
) => {
  const fromPageViewId = await findRecentPageViewBySession(sessionId);
  if (fromPageExitTime) {
    await insertPageExitTime({
      fromPageViewId,
      exitTime: fromPageExitTime,
    });
  }

  const pageTransition = await insertPageTransition({
    pageTransitionInfo,
    fromPageViewId,
    toPageViewInfo: {
      ...toPageViewInfo,
      sessionId,
    },
  });
  return pageTransition;
};
