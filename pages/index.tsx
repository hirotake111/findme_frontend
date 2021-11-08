import type { NextPage } from "next";

import SearchMessage from "../components/common/SearchMessage/SearchMessage";
import Container from "../components/map/Container/Container";
import Geolocation from "../components/map/Geolocation/Geolocation";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <SearchMessage />
        <Container />
        <Geolocation />
      </div>
    </>
  );
};

export default Home;
