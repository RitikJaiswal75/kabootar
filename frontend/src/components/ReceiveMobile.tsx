import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import FileList from "./FileList"; // Ensure this path points to the correct FileList component

const ReceiveMobile = ({ uid }: { uid: string }) => {
  const [files, setFiles] = useState();
  const instance = useMemo(() => {
    return axios.create({});
  }, []);

  useEffect(() => {
    instance
      .get("/fileList", {
        headers: {
          uid,
        },
      })
      .then((res) => {
        setFiles(
          res.data.files.map((file: string) => ({
            name: file,
            size: 0,
            link: `/download/${uid}/${file}`,
          }))
        );
      });
  }, []);
  if (!files) return null;
  return <FileList files={files} progress={0} downloadable />;
};

export default ReceiveMobile;
