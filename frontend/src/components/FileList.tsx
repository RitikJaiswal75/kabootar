type FileListProps = {
  files: File[];
  progress: number;
};

// Helper function to format file size
const formatFileSize = (size: number): string => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

const FileList = ({ files, progress }: FileListProps) => {
  return (
    <div className="container mx-auto p-4">
      {files.length > 0 && (
        <div className="w-full px-2">
          <div className="border-b-2 border-emerald-950 p-4 relative">
            <div
              className={`bg-blue-200 opacity-40 w-[${progress}%] h-full absolute left-0 text-end text-white font-bold text-3xl`}
            ></div>
            <h2 className="font-bold text-2xl text-center">Files</h2>
          </div>
          {Array.from(files).map((file, index) => (
            <div
              className="flex w-full py-4 border-b-2 px-4 border-emerald-950 justify-between items-center"
              key={index}
            >
              <div className="flex flex-col">
                <p className=" flex font-bold text-lg items-center justify-center gap-1">
                  <i className="ri-file-add-line text-2xl"></i> {file.name}
                </p>
              </div>
              <div>
                <p className="font-bold text-lg">{formatFileSize(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;
