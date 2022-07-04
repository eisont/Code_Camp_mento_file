import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function MyLifecyclePage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(0);

  // componentDidMount와 동일
  useEffect(() => {
    console.log("마운트됨!!!");
    inputRef.current?.focus();

    // componentWillUnmount와 동일
    return () => {
      console.log("잘가요~");
    };
  }, []);

  // componentDidUpdate와 비슷
  useEffect(() => {
    console.log("수정됨!!!");
  });

  function onClickCounter() {
    setCount((prev) => prev + 1);
  }

  function onClickMove() {
    router.push("/");
  }

  console.log("이건 언제 실행될까요?!"); // componentDidMount 또는 useEffect 와의 실행순서 비교

  return (
    <>
      <input type="text" ref={inputRef} />
      <div>현재카운트: {count}</div>
      <button onClick={onClickCounter}>카운트 올리기!!!</button>
      <button onClick={onClickMove}>페이지 이동하기!!!</button>
    </>
  );
}
