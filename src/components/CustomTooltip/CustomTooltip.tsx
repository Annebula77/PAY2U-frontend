import { useState, type FC, type ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import HeartButton from '../icons/HeartIcon';

interface TooltipProps {
  children: ReactNode;
  isLiked?: boolean;
}

const CustomTooltipWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 126px;
  height: 36px;
`;

const TooltipText = styled.div<{ $isLiked: boolean }>`
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  border-radius: 6px;
  padding: 3px;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transition:
    visibility 0s linear 3s,
    opacity 0.3s;

  ${({ $isLiked }) =>
    $isLiked &&
    `
    visibility: visible;
    opacity: 1; 
    transition: opacity 0.3s; 
  `}

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 90%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
`;

const TooltipIcon = styled.span`
  color: rgba(255, 75, 107, 1);
  width: 28px;
  height: 28px;
  margin-right: 5px;
`;

const CustomTooltip: FC<TooltipProps> = ({ children, isLiked = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (isLiked) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLiked]);

  return (
    <CustomTooltipWrapper>
      {children}
      {showTooltip && (
        <TooltipText $isLiked={isLiked}>
          <TooltipIcon>
            <HeartButton isLiked={isLiked} />
          </TooltipIcon>
          В избранном
        </TooltipText>
      )}
    </CustomTooltipWrapper>
  );
};

export default CustomTooltip;
