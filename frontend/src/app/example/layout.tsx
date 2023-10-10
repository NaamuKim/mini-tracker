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
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        src={ENV_CONSTANTS.APP_SDK_URL}
        strategy="beforeInteractive"
      ></Script>
    </>
  );
}
