import { REGEX } from "@/app.module/utils/REGEX";
import { capitalizeFirstLetter } from "@/app.module/utils/string";
import { go } from "@/app.module/utils/functional";

export const formatReferrer = (referrer: string): string =>
  go(
    referrer,
    (referrer: string) => referrer.replace(REGEX.SIMPLIFY_URL, ""),
    (simplified: string) => simplified.split("/")[0],
    capitalizeFirstLetter,
  );
