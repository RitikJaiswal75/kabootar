import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload";
import { useCallback, useState } from "react";
import FileList from "./components/FileList";
import Instructions from "./components/Instructions";
import Modal from "./components/Modal";
import ReceiveMobile from "./components/ReceiveMobile";

function App() {
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<File[] | null>(null);
  const queryParams = new URLSearchParams(window.location.search);
  const role = queryParams.get("role");
  const mode = queryParams.get("mode");
  const uid = queryParams.get("uid");
  const device = queryParams.get("device");

  const getUserComponent = useCallback(() => {
    if (uid && mode === "receive") {
      if (device === "mobile")
        return (
          <Instructions
            url={`${window.location.origin}/?mode=${mode}&uid=${uid}`}
            mode={mode}
          />
        );
      return <ReceiveMobile uid={uid} />;
    }
    if (role === "sender") {
      return <FileUpload setProgress={setProgress} setFiles={setFiles} />;
    }
    if (role === "receiver") {
      return <Instructions />;
    }
    return <Modal title="Welcome to Kab👀tar" />;
  }, [role]);

  return (
    <>
      <Navbar />
      {getUserComponent()}
      {files ? <FileList files={files} progress={progress} /> : null}
    </>
  );
}

export default App;
