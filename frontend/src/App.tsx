import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload";
import { useState } from "react";
import Progress from "./components/Progress";
import FileList from "./components/FileList";

function App() {
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<File[] | null>(null);

  return (
    <>
      <Navbar />
      <FileUpload setProgress={setProgress} setFiles={setFiles} />
      <Progress uploaded={progress} />
      {files ? <FileList files={files} /> : null}
    </>
  );
}

export default App;
