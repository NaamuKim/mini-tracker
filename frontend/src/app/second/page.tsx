import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>Second Landing Page</div>
      <Link href="/">
        <h2>Go to first page</h2>
      </Link>
    </main>
  );
}
