import { useRouter } from "next/dist/client/router";
import Initializer from "../components/direction/Initializer/Initializer";
import Geolocation from "../components/map/Geolocation/Geolocation";

export default function Direction() {
  const router = useRouter();
  const { positionId } = router.query;

  return (
    <>
      {typeof positionId === "string" ? (
        <>
          <Initializer positionId={positionId} />
          <Geolocation />
        </>
      ) : (
        <p>Error - invalid position ID: {positionId}</p>
      )}
      <div>Position ID: {positionId}</div>
    </>
  );
}
