import { type FC } from 'react';
import { Typography } from '@mui/material';
import { BenefitContainer, Icon } from './benefitsStyles';

interface BenefitProps {
  icon: string;
  benefit: string;
}

const Benefit: FC<BenefitProps> = ({ icon, benefit }) => {
  const urlRegex = /(https:\/\/[^\s]+)/g;

  const benefitElements = benefit.split(urlRegex).map((fragment, index) => {
    if (fragment.match(urlRegex)) {
      return (
        <Typography
          key={index}
          component="a"
          href={fragment}
          target="_blank"
          rel="noopener noreferrer"
          className="textRegular"
          color="primary"
          sx={{
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'underline',
            },
            margin: 0,
            padding: 0,
          }}
        >
          Ссылка на сервис
        </Typography>
      );
    } else {
      return (
        <Typography
          key={index}
          className="textRegular"
          color="text.primary"
          align="left"
          sx={{
            margin: 0,
            padding: 0,
          }}
        >
          {fragment}
        </Typography>
      );
    }
  });

  return (
    <BenefitContainer>
      <Icon src={icon} alt="a" />
      {benefitElements}
    </BenefitContainer>
  );
};

export default Benefit;
