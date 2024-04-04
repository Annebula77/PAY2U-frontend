import { useState, type FC, type ReactNode, useEffect } from 'react';
import HeartButton from '../icons/HeartIcon';
import { CustomTooltipWrapper, TooltipIcon, TooltipText } from './customTooltipStyles';

interface TooltipProps {
  children: ReactNode;
  isLiked?: boolean;
}


const CustomTooltip: FC<TooltipProps> = ({ children, isLiked = false }) => {

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (isLiked) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
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
