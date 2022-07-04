import { useMutation, gql } from '@apollo/client'
import { useState } from 'react'

const CREATE_BOARD = gql`
    mutation createBoard($writer: String, $title: String, $contents: String){
        createBoard(writer: $writer, title: $title, contents: $contents){
            _id
            number
            message
        }
    }
`

export default function GraphqlMutationBoard3Page(){
    const [myWriter, setMyWriter] = useState("")


    const [createBoard] = useMutation(CREATE_BOARD)

    function onChangeMyWriter(event){
        setMyWriter(event.target.value)
    }

    function onChangeMyTitle(){

    }

    function onChangeMyContents(){

    }

    async function zzz(){
        const result = await createBoard({
            variables: { writer: myWriter, title: "제목이요!!", contents: "내용이요!!" }
        })
        console.log(result)
        console.log(result.data.createBoard.message)
    }

    return (
        <>
            작성자: <input type="text" onChange={onChangeMyWriter} /><br />
            제목: <input type="text" /><br />
            내용: <input type="text" /><br />
            <button onClick={zzz}>게시물 등록하기!!!</button>
        </>
    )


}