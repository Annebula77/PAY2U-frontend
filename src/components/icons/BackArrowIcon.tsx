import { type FC } from 'react';

interface Props {
  className?: string;
}

const BackArrowIcon: FC<Props> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    className={className}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.5513 2.38437C12.1248 2.91964 12.1522 
    3.81462 11.6124 4.38335L4.38408 12L11.6124 19.6167C12.1522 
    20.1854 12.1248 21.0804 11.5513 21.6156C10.9779
     22.1509 10.0754 22.1238 9.53571 21.5551L1.38757 12.9692C0.870811
      12.4247 0.870811 11.5753 1.38757 11.0308L9.53571 2.44494C10.0754 1.87621 10.9779 1.84909 11.5513 2.38437Z"
      fill="#282B2E"
    />
  </svg>
);

export default BackArrowIcon;
