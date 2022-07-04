import { useMutation, gql } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
    IMutation,
    IMutationCreateBoardArgs,
    IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";

const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!) {
        uploadFile(file: $file) {
            url
        }
    }
`;

const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!) {
        createBoard(createBoardInput: $createBoardInput) {
            _id
            writer
            title
            contents
            images
        }
    }
`;

export default function ImageUploadPreviewPage() {
    const [imageUrls, setImageUrls] = useState<string[]>([""]);
    const [myFiles, setMyFiles] = useState<File[]>([]);
    const [uploadFile] = useMutation<
        Pick<IMutation, "uploadFile">,
        IMutationUploadFileArgs
    >(UPLOAD_FILE);
    const [createBoard] = useMutation<
        Pick<IMutation, "createBoard">,
        IMutationCreateBoardArgs
    >(CREATE_BOARD);

    function onChangeFile(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        console.log(file);
        if (!file) {
            alert("파일이 없습니다");
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (data) => {
            console.log(data.target?.result);
            const imageUrl = data.target?.result;
            if (typeof imageUrl === "string") {
                setImageUrls((prev) => [...prev, imageUrl]);
                setMyFiles((prev) => [...prev, file]);
            }
        };
    }

    async function onClickSubmit() {
        // let myImageUrls = ["", "", "", "", ""];
        // 1. 파일업로드
        if (myFiles.length) {
            // 1. 각각올리기 테스트 - (5개)
            // const start = performance.now();
            // await uploadFile({ variables: { file: myFiles[0] } });
            // await uploadFile({ variables: { file: myFiles[0] } });
            // await uploadFile({ variables: { file: myFiles[0] } });
            // await uploadFile({ variables: { file: myFiles[0] } });
            // await uploadFile({ variables: { file: myFiles[0] } });
            // const end = performance.now();
            // console.log(end - start);
            //
            //
            // 2. 동시올리기 테스트 - (5개)
            const start = performance.now();
            // Promise.all([ ... ]) vs Promise.race([ ... ]) 비교하기
            const result = await Promise.all([
                uploadFile({ variables: { file: myFiles[0] } }),
                uploadFile({ variables: { file: myFiles[0] } }),
                uploadFile({ variables: { file: myFiles[0] } }),
                uploadFile({ variables: { file: myFiles[0] } }),
                uploadFile({ variables: { file: myFiles[0] } }),
            ]);
            const end = performance.now();
            console.log(end - start);
            // result = [result1, result2, result3, result4, result5, ..., result10]
            // result.map((el) => el.data.uploadFile.url) => [url1, url2, url3, ..., url10]
            // myImageUrls = result.map((el) => el.data?.uploadFile.url);
        }

        // 2. 업로드된파일로 게시물등록
        // const result2 = await createBoard({
        //     variables: {
        //         createBoardInput: {
        //             writer: "영희",
        //             password: "1234",
        //             title: "안녕하세요~~~~",
        //             contents: "이미지 업로드 연습중이에요!",
        //             images: [...myImageUrls],
        //         },
        //     },
        // });
        // console.log(result2.data?.createBoard._id);
    }

    return (
        <>
            <img src={imageUrls[0]} />
            <input type="file" onChange={onChangeFile} />
            <button onClick={onClickSubmit}>등록하기</button>
        </>
    );
}
