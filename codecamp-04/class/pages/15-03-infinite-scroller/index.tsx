import { gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import InfiniteScroll from "react-infinite-scroller";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function InfiniteScrollerPage() {
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  // 1. 12페이지 요청 => 120개
  // 2. 13페이지 요청 => 127개 (추가 7개)
  // 3. 14페이지 요청 => 127개 (추가 0개)

  function onLoadMore() {
    if (!data) return;

    fetchMore({
      variables: { page: Math.ceil(data?.fetchBoards.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchBoards)
          return { fetchBoards: [...prev.fetchBoards] };

        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult?.fetchBoards],
        };
      },
    });
  }

  return (
    <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span>{el.writer}</span>
          <span>{el.title}</span>
          <span>{el.contents}</span>
        </div>
      ))}
    </InfiniteScroll>
  );
}
