"use client";
import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { pages } from "@/lib/common/pages";
import styles from "./pageNo.module.css";
import { usePathname } from "next/navigation";
const Page: NextPage = () => {
  const pathname = usePathname();

  return (
    <>
      <h2 className={styles.header}>
        here is page {pathname.split("/").pop()} <br />
      </h2>
      {pages.map(({ href, pageNo }) => (
        <Link key={"page-link" + href} href={href} className={styles.pageLink}>
          <em>Go to page ${pageNo}</em>
        </Link>
      ))}
    </>
  );
};

export default Page;
