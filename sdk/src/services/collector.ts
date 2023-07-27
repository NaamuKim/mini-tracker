import { UserPostedInfo } from "@/models/userPostedInfo";
import { fetcher } from "@/services/http/fetcher";

export const sendPageInfoToServer = <T extends UserPostedInfo>({
  previousPage,
  currentPage,
  scrollY,
  scrollX,
}: T) => {
  const data = { previousPage, currentPage, scrollY, scrollX };
  fetcher("http://localhost:8080/", {
    method: "POST",
    body: data,
  });
};
