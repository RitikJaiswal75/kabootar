type ProgressProps = {
  uploaded: number;
};

const Progress = ({ uploaded }: ProgressProps) => {
  if (!uploaded) return null;
  return <div>{uploaded}%</div>;
};

export default Progress;
