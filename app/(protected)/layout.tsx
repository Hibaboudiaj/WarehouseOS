import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header
        userName={session?.user?.name ?? ""}
        userEmail={session?.user?.email ?? ""}
      />

      <main
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}