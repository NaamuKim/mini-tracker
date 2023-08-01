import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>Landing Page</div>
      <Link href="/example/1">
        <h2>Go to tracked page</h2>
      </Link>
      <Link href="/dashboard">
        <h2>Go to Dashboard page</h2>
      </Link>
    </main>
  );
}
