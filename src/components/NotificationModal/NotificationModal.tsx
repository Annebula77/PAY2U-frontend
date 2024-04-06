import { type FC } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from 'styled-components';
import SuccessIcon from '../icons/SuccessIcon';
import ErrorRoundIcon from '../icons/ErrorRoundIcon';
import { GeneralModal } from '../GeneralModal/GeneralModal';
import { Typography } from '@mui/material';
import {
  IconContainer,
  MessageContainer,
  ModalContainer,
} from './notificationModalStyles';

export interface NotificationModalProps {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  infoMessage?: string;
  link?: string;
  onClose: () => void;
  actions?: React.ReactNode;
}

const NotificationModal: FC<NotificationModalProps> = ({
  type,
  title,
  message,
  infoMessage,
  link,
  onClose,
  actions,
}) => {
  const theme = useTheme();

  const notificationStyles = {
    success: {
      backgroundColor: 'rgba(242, 247, 255, 1)',
      icon: <SuccessIcon width={48} height={48} />,
    },
    error: {
      backgroundColor: 'rgba(255, 75, 107, 0.1)',
      icon: (
        <ErrorRoundIcon
          width={48}
          height={48}
          fill={theme.palette.error.main}
        />
      ),
    },
    info: {
      backgroundColor: 'rgb(255, 255, 255)',
      icon: (
        <ErrorRoundIcon
          width={48}
          height={48}
          fill={theme.palette.error.main}
        />
      ),
    },
  };

  const currentStyle = notificationStyles[type];

  return createPortal(
    <GeneralModal onClose={onClose}>
      <ModalContainer>
        <IconContainer>{currentStyle.icon}</IconContainer>
        <Typography
          variant="h2"
          color={theme.palette.text.primary}
          align="center"
        >
          {title}
        </Typography>
        <MessageContainer
          style={{ backgroundColor: currentStyle.backgroundColor }}
        >
          <Typography
            className="textCard"
            color={theme.palette.text.primary}
            align="center"
          >
            {message}
          </Typography>
        </MessageContainer>
        {infoMessage && (
          <Typography
            className="textCard"
            color={theme.palette.text.primary}
            align="center"
          >
            {infoMessage}
          </Typography>
        )}
        {link && (
          <Typography
            component="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="textCard"
            color="primary"
            sx={{
              textDecoration: 'none',
              ':hover': {
                textDecoration: 'underline',
              },
              marginBottom: '12px',
              padding: 0,
            }}
          >
            Ссылка на сервис
          </Typography>
        )}
        {actions}
      </ModalContainer>
    </GeneralModal>,
    document.body
  );
};

export default NotificationModal;
