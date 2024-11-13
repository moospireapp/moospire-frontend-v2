import { AuthEntryLayout } from "@/app/_components";

export default function AuthEntryRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <AuthEntryLayout>{children}</AuthEntryLayout>
    </main>
  );
}
