import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { IQuery, IQueryFetchBoardCommentsArgs } from '../../../../commons/types/generated/types';
import BoardCommentListUI from './BoardCommentList.presenter';
import { FETCH_BOARD_COMMENTS } from './BoardCommentList.queries';

export default function BoardCommentList() {
  const router = useRouter();
  const { data, fetchMore } = useQuery<Pick<IQuery, 'fetchBoardComments'>, IQueryFetchBoardCommentsArgs>(FETCH_BOARD_COMMENTS, {
    variables: { boardId: String(router.query.boardId) },
  });

  const onLoadMore = () => {
    if (!data) return;

    fetchMore({
      variables: { page: Math.ceil(data?.fetchBoardComments.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        // 받아올 데이터가 없을 경우 return(기존 데이터 보여줘)
        if (!fetchMoreResult?.fetchBoardComments) return { fetchBoardComments: [...prev.fetchBoardComments] };
        return {
          fetchBoardComments: [
            // 이전 뎃글 보여줘
            ...prev.fetchBoardComments,
            // 다음 댓글 보여줘
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };

  return <BoardCommentListUI data={data} onLoadMore={onLoadMore} />;
}
