import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageUploadPage() {
  const [myImages, setMyImages] = useState([""]);
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  async function onChangeFile(event: ChangeEvent<HTMLInputElement>) {
    const myFile = event.target.files?.[0];
    console.log(myFile);

    try {
      const result = await uploadFile({
        variables: {
          file: myFile,
        },
      });
      console.log(result.data?.uploadFile.url);
      if (!result.data) throw new Error("업로드에 실패했습니다.");

      setMyImages([result.data?.uploadFile.url]);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <input type="file" onChange={onChangeFile} />
      <img src={`https://storage.googleapis.com/${myImages}`} />
    </>
  );
}
