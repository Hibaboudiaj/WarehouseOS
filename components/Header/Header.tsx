"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import Button from "@/components/Button/Button";
import styles from "./Header.module.css";

interface HeaderProps {
  userName: string;
  userEmail: string;
}

export default function Header({ userName, userEmail }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/dashboard" className={styles.logo}>
          <span className={styles.logoMark} />
          WarehouseOS
        </Link>

        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navLink}>
            Dashboard
          </Link>

          <Link href="/products" className={styles.navLink}>
            Produits
          </Link>

          <Link href="/categories" className={styles.navLink}>
            Catégories
          </Link>

          <Link href="/stock/movements" className={styles.navLink}>
            Stock
          </Link>
        </nav>

        <div className={styles.userArea}>
          <div className={styles.userText}>
            <span className={styles.userName}>{userName}</span>
            <span className={styles.userEmail}>{userEmail}</span>
          </div>
          <Button
            variant="secondary"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  );
}
