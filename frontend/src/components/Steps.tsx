const Steps = ({ step }: { step: string }) => {
  return (
    <div className="flex w-full py-4 border-b-2 px-4 border-emerald-950 justify-between items-center">
      <div className="flex flex-col">
        <p className="flex font-bold text-lg items-center justify-center gap-1">
          <i className="ri-file-add-line text-2xl"></i> {step}
        </p>
      </div>
    </div>
  );
};

export default Steps;
