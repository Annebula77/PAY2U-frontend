import { type FC } from 'react';

interface Props {
  className?: string;
}

const ArrowRight: FC<Props> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    className={className}
    <circle opacity="0.1" cx="8" cy="8" r="8" fill="#EA417F" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.68933 8.74996H3.5L3.5 7.24996H9.68935L7.46967 5.03027L8.53033 3.96961L12.5607 7.99996L8.53033 12.0303L7.46967 10.9696L9.68933 8.74996Z"
      fill="#EA417F"
    />
  </svg>
);

export default ArrowRight;
