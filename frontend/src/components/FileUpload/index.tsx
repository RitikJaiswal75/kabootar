import axios from "axios";
import { fileTypes } from "../../constants/fileTypes";
import FileTypeCard from "./FileTypeCard";

const FileUpload = () => {
  const instance = axios.create({
    baseURL: "http://192.168.31.21:3000",
    onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    instance.post("/", data).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
        encType="multipart/form-data"
        className="flex flex-col gap-10 flex-wrap justify-center"
      >
        <div className="flex gap-8 justify-center items-center flex-wrap">
          {fileTypes.map((fileType) => {
            return (
              <FileTypeCard key={fileType.fileType} fileTypeData={fileType} />
            );
          })}
        </div>
        <input
          type="submit"
          value="🚀 Share"
          className="p-4 rounded-lg text-xl bg-blue-900 w-3xs font-bold text-white cursor-pointer hover:bg-blue-800 mx-auto"
        />
      </form>
    </>
  );
};

export default FileUpload;
