import axios from "axios";
import { fileTypes } from "../../constants/fileTypes";
import FileTypeCard from "./FileTypeCard";
import { useMemo } from "react";

type FileUploadProps = {
  setProgress: (progress: number) => void;
  setFiles: (files: File[] | null) => void;
};

const FileUpload = ({ setProgress, setFiles }: FileUploadProps) => {
  const instance = useMemo(() => {
    return axios.create({
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentCompleted = Math.round((loaded * 100) / (total || 1));
        setProgress(percentCompleted);
      },
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    const files = document.querySelectorAll(
      "input[type=file]"
    ) as unknown as HTMLInputElement[];
    files.forEach((file) => {
      if (file && file.files) {
        Array.from(file.files).forEach((f) => {
          data.append("files", f);
        });
      }
    });
    instance.post("/", data);
  };

  const handleFileList = () => {
    const allFiles: File[] = [];
    const fileInputs = document.querySelectorAll("input[type=file]");
    fileInputs.forEach((fileInput) => {
      const file = fileInput as HTMLInputElement;
      if (file && file.files) {
        Array.from(file.files).forEach((f) => {
          allFiles.push(f);
        });
      }
    });
    setFiles(allFiles);
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
              <FileTypeCard
                key={fileType.fileType}
                fileTypeData={fileType}
                setFiles={handleFileList}
              />
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
