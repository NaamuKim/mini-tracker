import Script from "next/script";
import { ENV_CONSTANTS } from "@/app.module/constant/env";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script src={ENV_CONSTANTS.APP_SDK_URL} />
    </>
  );
}
