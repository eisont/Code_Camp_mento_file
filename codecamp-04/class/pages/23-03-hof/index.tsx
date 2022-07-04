export default function HofPage() {
  const onClickChild = (index: number) => (event) => {
    console.log(event.target.id); // 0
  };

  //   function onClickChild(event) {
  //     console.log(event.target.id); // 0
  //   }

  return (
    <>
      <h1>HOF 연습 페이지입니다!!!</h1>
      <div>
        {["철수", "영희", "훈이"].map((el, index) => (
          <div key={el} onClick={onClickChild(index)}>
            {el}
          </div>
        ))}
      </div>
    </>
  );
}
