import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script src={process.env.NEXT_PUBLIC_SDK_URL} />
    </>
  );
}
