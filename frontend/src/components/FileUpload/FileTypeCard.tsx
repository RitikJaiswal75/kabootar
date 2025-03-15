import { fileTypes } from "../../constants/fileTypes";

type FileTypeCardProps = {
  fileTypeData: (typeof fileTypes)[number];
};

const FileTypeCard = ({ fileTypeData }: FileTypeCardProps) => {
  return (
    <div
      className={`flex flex-col justify-center items-center relative ${fileTypeData.colour} ${fileTypeData.hoverBackground} hover:text-white p-4 rounded-lg cursor-pointer hover:border-0 border border-gray-400 shadow-lg ${fileTypeData.shadowClass} transition-all duration-100`}
    >
      <input
        type="file"
        className="w-full h-full absolute opacity-0"
        accept={fileTypeData.accept}
      />
      <i className={`${fileTypeData.icon} text-5xl sm:text-9xl`}></i>

      <p className="font-bold text-sm">{fileTypeData.label}</p>
    </div>
  );
};

export default FileTypeCard;
