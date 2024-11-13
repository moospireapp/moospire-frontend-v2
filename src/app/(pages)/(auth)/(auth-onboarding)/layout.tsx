import { AuthOnboardingLayout } from "@/app/_components";

export default function AuthEntryRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <AuthOnboardingLayout>{children}</AuthOnboardingLayout>
    </main>
  );
}
