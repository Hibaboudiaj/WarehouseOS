import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./layout.module.css";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <Header userName="Camille Farhat" userEmail="camille.farhat@warehouseos.com" />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}