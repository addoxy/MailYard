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

export const GithubIcon = ({ className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn('fill-current', className)}
    >
      <path
        fill="currentColor"
        d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
      ></path>
    </svg>
  );
};

export const TwitterIcon = ({ className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      className={cn('fill-current', className)}
    >
      <g fill="none">
        <g clipPath="url(#SVGG1Ot4cAD)">
          <path
            fill="currentColor"
            d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"
          ></path>
        </g>
        <defs>
          <clipPath id="SVGG1Ot4cAD">
            <path fill="#fff" d="M0 0h14v14H0z"></path>
          </clipPath>
        </defs>
      </g>
    </svg>
  );
};
