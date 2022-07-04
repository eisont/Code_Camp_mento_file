import Head from "next/head";

export default function BoardsPage() {
  return (
    <>
      <Head>
        <meta property="og:title" content="나만의 사이트 게시판!!!" />
        <meta property="og:url" content="http://codecamp-deploy.com" />
        <meta
          property="og:image"
          content="https://www.codingfactory.net/wp-content/uploads/abc.jpg"
        />
        <meta
          property="og:description"
          content="안녕하세요! 나의 사이트에 오신것을 환영합니다!"
        />
      </Head>
      <div>안녕하세요! 게시판입니다!!!</div>
    </>
  );
}
