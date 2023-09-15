import { Prisma } from "@prisma/client";

export type PageTransitionCreateInputWithoutFromTo = Omit<
  Prisma.PageTransitionCreateInput,
  "fromPageView" | "toPageView"
>;
