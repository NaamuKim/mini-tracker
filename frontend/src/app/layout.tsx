import StyledComponentsRegistry from "@/app.styled/styled-component";
import QueryProvider from "@/app.module/react-query/QueryProvider";
import "@/app.feature/dashboard.entry/style/reset.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>mini tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <QueryProvider>{children}</QueryProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
