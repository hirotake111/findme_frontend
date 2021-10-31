import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <LoadingSpinner />
    </div>
  );
};

export default Home;
