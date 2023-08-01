"use client";
import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import styles from "./pageNo.module.css";
import { usePathname } from "next/navigation";
import { getPages } from "@/app.module/pages";
const ExamplePageNo: NextPage = () => {
  const pathname = usePathname();

  return (
    <>
      <h2 className={styles.header}>
        here is page {pathname.split("/").pop()} <br />
      </h2>
      {getPages(10).map(({ href, pageNo }) => (
        <Link key={"page-link" + href} href={href} className={styles.pageLink}>
          <em>Go to page ${pageNo}</em>
        </Link>
      ))}
    </>
  );
};

export default ExamplePageNo;
