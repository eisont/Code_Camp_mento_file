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
    const [imageUrl, setImageUrl] = useState("");
    const [myFile, setMyFile] = useState<File>();
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
            if (typeof data.target?.result === "string") {
                console.log(data.target?.result);
                setImageUrl(data.target?.result);
                setMyFile(file);
            }
        };
    }

    async function onClickSubmit() {
        let myImageUrl = "";
        // 1. 파일업로드
        if (myFile) {
            const result1 = await uploadFile({
                variables: {
                    file: myFile,
                },
            });
            myImageUrl = result1.data?.uploadFile.url || "";
        }

        // 2. 업로드된파일로 게시물등록
        const result2 = await createBoard({
            variables: {
                createBoardInput: {
                    writer: "영희",
                    password: "1234",
                    title: "안녕하세요~~~~",
                    contents: "이미지 업로드 연습중이에요!",
                    images: [myImageUrl],
                },
            },
        });
        console.log(result2.data?.createBoard._id);
    }

    return (
        <>
            <img src={imageUrl} />
            <input type="file" onChange={onChangeFile} />
            <button onClick={onClickSubmit}>등록하기</button>
        </>
    );
}
