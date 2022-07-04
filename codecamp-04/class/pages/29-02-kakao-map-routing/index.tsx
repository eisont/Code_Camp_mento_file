import { useRouter } from "next/router";
import Link from "next/link";

export default function KakaoMapRoutingPage() {
  const router = useRouter();

  function onClickMoveToMap() {
    router.push("/29-03-kakao-map-routed");
  }

  return (
    <>
      <button onClick={onClickMoveToMap}>
        맵으로 이동하기!!!(router.push)
      </button>
      {/* <br />
      <a href="/29-03-kakao-map-routed">맵으로 이동하기!!(a태그)</a>
      <br />
      <Link href="/29-03-kakao-map-routed">
        <a>맵으로 이동하기!!(Link태그)</a>
      </Link> */}
    </>
  );
}
