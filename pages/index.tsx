import type { NextPage } from "next";

import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import Container from "../components/map/Container/Container";
import Geolocation from "../components/map/Geolocation/Geolocation";
import LinkModal from "../components/modal/LinkModal/LinkModal";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <ErrorMessage />
        <LinkModal />
        <Container />
        <Geolocation />
      </div>
    </>
  );
};

export default Home;
