import { UserPostedInfo } from "@/models/userPostedInfo";

export const sendPageInfoToServer = <T extends UserPostedInfo>({
  previousPage,
  currentPage,
}: T) => {
  const data = { previousPage, currentPage };
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
};
