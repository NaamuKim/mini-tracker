import { UserPostedInfo } from "@/models/userPostedInfo";
import { sendPageInfoToServer } from "@/services/collector";

export const handlePageChange = (previousPage: string) => {
  const currentPage = window.location.href;
  if (currentPage !== previousPage) {
    sendPageInfoToServer<UserPostedInfo>({
      previousPage,
      currentPage,
      scrollY: window.scrollY,
      scrollX: window.scrollX,
    });
    previousPage = currentPage;
    localStorage.setItem("previousPage", currentPage);
  }
};
