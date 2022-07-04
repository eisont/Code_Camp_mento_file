import * as Sentry from "@sentry/nextjs";
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { Global } from "@emotion/react";
import "antd/dist/antd.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import { globalStyles } from "../src/commons/styles/globalStyles";
import Layout from "../src/components/commons/layout";
import { createUploadLink } from "apollo-upload-client";
// import Head from "next/head";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { getAccessToken } from "../src/commons/libraries/getAccessToken";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVlehebGH9EilvdWjqx2W1KAkl-UBI2TY",
    authDomain: "codecamp-aa4c2.firebaseapp.com",
    projectId: "codecamp-aa4c2",
    storageBucket: "codecamp-aa4c2.appspot.com",
    messagingSenderId: "434605305014",
    appId: "1:434605305014:web:1674564dbd239a21124a17",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

Sentry.init({
    dsn: "https://67e6c9bdab8b4daa86e90ce0335f9a1e@o965334.ingest.sentry.io/6109509",
});

interface IGlobalContext {
    accessToken?: string;
    setAccessToken?: Dispatch<SetStateAction<string>>;
    userInfo?: {
        name?: string;
        email?: string;
        picture?: string;
    };
    setUserInfo?: Dispatch<SetStateAction<{}>>;
}
export const GlobalContext = createContext<IGlobalContext>({});
function MyApp({ Component, pageProps }: AppProps) {
    const [myAccessToken, setMyAccessToken] = useState("");
    const [myUserInfo, setMyUserInfo] = useState({});
    const myValue = {
        accessToken: myAccessToken,
        setAccessToken: setMyAccessToken,
        userInfo: myUserInfo,
        setUserInfo: setMyUserInfo,
    };

    useEffect(() => {
        // const accessToken = localStorage.getItem("accessToken") || "";
        // if (accessToken) setMyAccessToken(accessToken);
        if (localStorage.getItem("refreshToken"))
            getAccessToken(setMyAccessToken);
    }, []);

    const errorLink = onError(({ graphQLErrors, operation, forward }) => {
        if (graphQLErrors) {
            for (const err of graphQLErrors) {
                // 1. 토큰만료 에러를 캐치
                if (err.extensions?.code === "UNAUTHENTICATED") {
                    // 3. 기존에 실패한 요청 다시 재요청하기
                    operation.setContext({
                        headers: {
                            ...operation.getContext().headers,
                            authorization: `Bearer ${getAccessToken(
                                setMyAccessToken
                            )}`, // 2. refreshToken으로 accessToken 재발급 받기 => restoreAccessToken
                        },
                    });
                    return forward(operation);
                }
            }
        }
    });

    const uploadLink = createUploadLink({
        uri: "https://backend04.codebootcamp.co.kr/graphql",
        headers: { authorization: `Bearer ${myAccessToken}` },
        credentials: "include",
    });

    const client = new ApolloClient({
        link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
        cache: new InMemoryCache(),
    });

    return (
        <>
            {/* <Head> 모든 페이지에서 카카오맵을 다운로드 받으므로 비효율적임
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=bd32674f73acffb55599616a9c966a1c"
        ></script>
      </Head> */}
            <GlobalContext.Provider value={myValue}>
                <ApolloProvider client={client}>
                    <Global styles={globalStyles} />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ApolloProvider>
            </GlobalContext.Provider>
        </>
    );
}

export default MyApp;
