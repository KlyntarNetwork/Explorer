import { FC, ReactNode } from 'react';
import { SxProps, Typography } from '@mui/material';
import { BG_COLORS, COLORS } from '@/styles';
import { Instagram, X} from '@mui/icons-material';
import Discord from '@public/icons/social/Discord.svg';

type SocialMediaIconProps = {
  variant: string;
};

const SocialMediaIcon: FC<SocialMediaIconProps> = ({ variant }) => {
  switch (variant) {
    case 'violet':
      return <Discord style={{ fontSize: '16px', marginRight: '8px' }} />;
    case 'red':
      return <Instagram style={{ fontSize: '16px', marginRight: '8px'}} />;
    case 'dark':
      return <X style={{ fontSize: '16px', marginRight: '8px'}} />;
    default:
      return null;
  }
};

export const SocialMediaLabel: FC<{
  children: ReactNode;
  variant: string;
  href: string;
  sx?: SxProps;
}> = ({ children, variant, href, sx }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <Typography
        variant="body2"
        color={
          variant === 'green'
            ? COLORS.GREEN
            : variant === 'red'
            ? COLORS.RED
            : variant === 'blue'
            ? COLORS.CYAN
            : variant === 'orange'
            ? COLORS.ORANGE
            : COLORS.SILVER
        }
        sx={{
          backgroundColor:
            variant === 'green'
              ? BG_COLORS.GREEN
              : variant === 'red'
              ? BG_COLORS.RED
              : variant === 'blue'
              ? BG_COLORS.CYAN
              : variant === 'orange'
              ? BG_COLORS.ORANGE
              : BG_COLORS.SILVER,
          px: 1,
          lineHeight: '30px',
          borderRadius: '3px',
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          ...sx,
        }}
      >
        <SocialMediaIcon variant={"red"} />
        {children}
      </Typography>
    </a>
  );
};
