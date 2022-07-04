import { gql, useMutation } from "@apollo/client";
import { ChangeEvent } from "react";
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
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  async function onChangeFile(event: ChangeEvent<HTMLInputElement>) {
    const myFile = event.target.files?.[0];
    console.log(myFile);

    const result = await uploadFile({
      variables: {
        file: myFile,
      },
    });
    console.log(result.data?.uploadFile.url);
  }

  return <input type="file" onChange={onChangeFile} />;
}
