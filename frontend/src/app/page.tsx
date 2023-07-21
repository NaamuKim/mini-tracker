import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>Main Landing Page</div>
      <Link href="/second">
        <h2>Go to second page</h2>
      </Link>
    </main>
  );
}
