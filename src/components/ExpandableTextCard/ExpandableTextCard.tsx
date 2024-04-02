import React, { useState } from 'react';
import { Typography, IconButton, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';

interface ExpandableTextCardProps {
  text: string;
}

const ShowMoreContainer = styled.div`
  display: flex;
  align-items: center;
  margin: -16px 0 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  justify-content: flex-start;
`;

const ShowMoreText = styled(Typography)`
  && {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
const TextContainer = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0 16px 0;
  display: flex;
  flex-direction: column;
`;

const ExpandableTextCard: React.FC<ExpandableTextCardProps> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const previewLength = 100;

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TextContainer>
      <Typography
        color="textPrimary"
        component="p"
        className="textRegular"
        sx={{ marginBottom: theme.spacing(2) }}
      >
        {isExpanded
          ? text
          : `${text.substring(0, previewLength)}${text.length > previewLength ? '...' : ''}`}
      </Typography>
      <ShowMoreContainer>
        <ShowMoreText
          onClick={handleExpandClick}
          theme={theme}
          className="textSmallMedium"
        >
          {isExpanded ? 'Скрыть' : 'Показать полностью'}
        </ShowMoreText>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={isExpanded}
          size="small"
          sx={{
            margin: 0,
            padding: 0,
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </ShowMoreContainer>
    </TextContainer>
  );
};

export default ExpandableTextCard;
