import {
  Wrapper,
  ColumnHeaderBasic,
  ColumnHeaderTitle,
  Row,
  ColumnBasic,
  ColumnTitle,
  Button,
  PencilIcon,
} from "./MyfirebaseList.styles";
import { IMyfirebaseListUIProps } from "./MyfirebaseList.types";

export default function MyfirebaseListUI(props: IMyfirebaseListUIProps) {
  return (
    <Wrapper>
      <Row>
        <ColumnHeaderBasic>번호</ColumnHeaderBasic>
        <ColumnHeaderBasic>제목</ColumnHeaderBasic>
        <ColumnHeaderTitle>내용</ColumnHeaderTitle>
        <ColumnHeaderBasic>작성자</ColumnHeaderBasic>
      </Row>
      {props.dataBoards?.map((el: any, index: number) => (
        <Row key={index}>
          <ColumnBasic>{index + 1}</ColumnBasic>
          <ColumnBasic>{el.title}</ColumnBasic>
          <ColumnTitle>{el.contents}</ColumnTitle>
          <ColumnBasic>{el.writer}</ColumnBasic>
        </Row>
      ))}
      <Button onClick={props.onClickMoveToBoardNew}>
        <PencilIcon src="/images/board/list/write.png" />
        게시물 등록하기
      </Button>
    </Wrapper>
  );
}
