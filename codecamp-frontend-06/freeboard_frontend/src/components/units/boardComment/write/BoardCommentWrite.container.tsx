import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { IMutation, IMutationCreateBoardCommentArgs, IMutationUpdateBoardCommentArgs, IUpdateBoardCommentInput } from '../../../../commons/types/generated/types';
import BoardCommentWriteUI from './BoardCommentWrite.presenter';
import { FETCH_BOARD_COMMENTS } from '../list/BoardCommentList.queries';
import { CREATE_BOARD_COMMENT, UPDATE_BOARD_COMMENT } from './BoardCommentWrite.queries';
import { IBoardCommentWriteProps } from './BoardCommentWrite.types';

export default function BoardCommentWrite(props: IBoardCommentWriteProps) {
  const router = useRouter();
  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');
  const [contents, setContents] = useState('');
  const [star, setStar] = useState(0);

  const [createBoardComment] = useMutation<Pick<IMutation, 'createBoardComment'>, IMutationCreateBoardCommentArgs>(CREATE_BOARD_COMMENT);
  const [updateBoardComment] = useMutation<Pick<IMutation, 'updateBoardComment'>, IMutationUpdateBoardCommentArgs>(UPDATE_BOARD_COMMENT);

  // 작성자
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };
  // 비밀번호
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  // 내용
  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };
  // 별표
  const onChangeStar = (value: number) => {
    setStar(value);
  };
  // 댓글 등록 버튼
  const onClickWrite = async () => {
    try {
      await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer,
            password,
            contents,
            rating: star,
          },
          boardId: String(router.query.boardId),
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const onClickUpdate = async () => {
    if (!contents) {
      alert('내용이 수정되지 않았습니다.');
      return;
    }
    if (!password) {
      alert('비밀번호가 입력되지 않았습니다.');
      return;
    }

    try {
      // id가 없을때 바로 return
      if (!props.el?._id) return;

      const updateBoardCommentInput: IUpdateBoardCommentInput = {};
      if (contents) updateBoardCommentInput.contents = contents;
      if (star !== props.el?.rating) updateBoardCommentInput.rating = star;

      await updateBoardComment({
        variables: {
          updateBoardCommentInput,
          password: password,
          boardCommentId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      // 화면 원상 복귀하기 위한 코드
      // false 일때는 수정창이 없습니다.
      props.setIsEdit?.(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <BoardCommentWriteUI
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeContents={onChangeContents}
      onChangeStar={onChangeStar}
      onClickWrite={onClickWrite}
      onClickUpdate={onClickUpdate}
      isEdit={props.isEdit}
      el={props.el}
      contents={contents}
    />
  );
}
