import { ChangeEvent, useCallback, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useForm } from "react-hook-form";

const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!) {
        createBoard(createBoardInput: $createBoardInput) {
            _id
        }
    }
`;

const inputsInit = {
    writer: "",
    password: "",
    title: "",
    contents: "",
};
export default function IsSubmittingPage() {
    // const {formState} = useForm()
    // formState.isSubmitting

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inputs, setInputs] = useState(inputsInit);
    const [createBoard] = useMutation(CREATE_BOARD);

    const onChangeInputs = useCallback(
        (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
            setInputs((prev) => ({
                ...prev,
                [name]: event.target.value,
            }));
        },
        []
    );

    const onClickSubmit = useCallback(async () => {
        setIsSubmitting(true);

        try {
            const result = await createBoard({
                variables: { createBoardInput: { ...inputs } },
            });
            console.log(result);
            Modal.confirm({ content: "등록에 성공하였습니다." });
            // router.push로 다이나믹 라우팅 => result.data.createBoard._id
        } catch (error) {
            Modal.error({ content: error.message });
        }

        setIsSubmitting(false);
    }, [inputs]);

    return (
        <>
            작성자: <input type="text" onChange={onChangeInputs("writer")} />
            <br />
            비밀번호:
            <input type="password" onChange={onChangeInputs("password")} />
            <br />
            제목: <input type="text" onChange={onChangeInputs("title")} />
            <br />
            내용: <input type="text" onChange={onChangeInputs("contents")} />
            <br />
            <button onClick={onClickSubmit} disabled={isSubmitting}>
                등록하기
            </button>
        </>
    );
}
