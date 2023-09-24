import { PageView } from "@prisma/client";
import { insertPageTransition } from "@/models/sdk/pageTransition";
import { findRecentPageViewBySession } from "@/models/sdk/pageView";
import { PageTransitionCreateInputWithoutFromTo } from "@/types/pageTransition";

export const registerPageTransition = async (
  sessionId: PageView["sessionId"],
  toPageViewInfo: PageView,
  pageTransitionInfo: PageTransitionCreateInputWithoutFromTo,
) => {
  const fromPageViewId = await findRecentPageViewBySession(sessionId);
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
