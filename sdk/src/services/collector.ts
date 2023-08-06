import { UserPostedInfo } from "@/models/userPostedInfo";
import { fetcher } from "@/services/http/fetcher";
import { API_PAGE_TRANSITION, API_PAGE_VIEW } from "@/constants/api";

export const sendPageTransitionInfoToServer = <T extends UserPostedInfo>({
  previous_page,
  current_page,
  scrollY,
  scrollX,
}: T) => {
  const data = { previous_page, current_page, scrollY, scrollX };
  fetcher(API_PAGE_TRANSITION, {
    method: "POST",
    body: {
      ...data,
      event_type: "page-transition",
      url: window.location.href,
      referrer_url: document.referrer,
    },
  });
};

export const sendPageViewInfoToServer = () => {
  fetcher(API_PAGE_VIEW, {
    method: "POST",
    body: {
      url: window.location.href,
      referrer_url: document.referrer,
      event_type: "page-view",
    },
  });
};
