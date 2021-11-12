import Home from ".";
import CodeModal from "../components/common/modal/CodeModal/CodeModal";
import Initializer from "../components/direction/Initializer/Initializer";
import { usePositionId } from "../hooks/directionHooks";

export default function Direction() {
  const positionId = usePositionId();

  return (
    <>
      {positionId ? (
        <>
          <CodeModal />
          <Initializer positionId={positionId} />
          <Home />
        </>
      ) : null}
    </>
  );
}
