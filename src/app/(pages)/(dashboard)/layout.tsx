import { DashboardBaseLayout } from "@/app/_components";

export default function AuthEntryRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <DashboardBaseLayout>{children}</DashboardBaseLayout>
    </main>
  );
}
