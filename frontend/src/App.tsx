import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload";
import { useState } from "react";
import FileList from "./components/FileList";
import Instructions from "./components/Instructions";

function App() {
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<File[] | null>(null);
  const queryParams = new URLSearchParams(window.location.search);
  const role = queryParams.get("role");

  return (
    <>
      <Navbar />
      {role !== "sender" ? (
        <FileUpload setProgress={setProgress} setFiles={setFiles} />
      ) : (
        <Instructions />
      )}
      {files ? <FileList files={files} progress={progress} /> : null}
    </>
  );
}

export default App;
