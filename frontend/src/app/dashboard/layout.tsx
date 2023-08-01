import "@/app.feature/dashboard/style/reset.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
