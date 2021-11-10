import { useRouter } from "next/dist/client/router";

import Home from ".";
import CodeModal from "../components/common/modal/CodeModal/CodeModal";
import Initializer from "../components/direction/Initializer/Initializer";

export default function Direction() {
  const router = useRouter();
  const { positionId } = router.query;

  return (
    <>
      {typeof positionId === "string" ? (
        <>
          <CodeModal />
          <Initializer positionId={positionId} />
          <Home />
        </>
      ) : (
        <p>Error - invalid position ID: {positionId}</p>
      )}
    </>
  );
}
