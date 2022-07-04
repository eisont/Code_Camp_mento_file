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

    if (!myFile?.size) {
      alert("파일이 없습니다!");
      return;
    }

    if (myFile.size > 5 * 1024 * 1024) {
      alert("파일 용량이 너무 큽니다.(제한: 5MB)");
      return;
    }

    if (!myFile.type.includes("jpeg") && !myFile.type.includes("png")) {
      alert("jpeg 또는 png만 업로드 가능합니다!!!");
      return;
    }

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
