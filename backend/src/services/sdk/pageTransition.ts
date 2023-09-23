import { PageView } from "@prisma/client";
import { insertPageTransition } from "@/models/pageTransition";
import { findRecentPageViewBySession } from "@/models/pageView";
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
