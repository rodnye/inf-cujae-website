interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div className={`h-4 w-full rounded-full bg-gray-200 ${className}`}>
      <div
        className="h-4 rounded-full bg-blue-600"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
