import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

export const DragDropIcon = ({ className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn('fill-current', className)}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M19 11V9a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path>
        <path d="m13 13l9 3l-4 2l-2 4zM3 3v.01M7 3v.01M11 3v.01M15 3v.01M3 7v.01M3 11v.01M3 15v.01"></path>
      </g>
    </svg>
  );
};

export const PhoneLaptop = ({ className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={cn('fill-current', className)}
    >
      <path
        fill="currentColor"
        d="M3 4a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 14 4v5a1.5 1.5 0 0 1-1.5 1.5h-4v-1h4A.5.5 0 0 0 13 9V4a.5.5 0 0 0-.5-.5h-8A.5.5 0 0 0 4 4h-.5q-.26 0-.5.063zm11.5 8.5h-6v-1h6a.5.5 0 0 1 0 1m-10 0a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1m-3-6A1.5 1.5 0 0 1 3 5h3a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 6 14H3a1.5 1.5 0 0 1-1.5-1.5zM3 6a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-6A.5.5 0 0 0 6 6z"
      ></path>
    </svg>
  );
};
