import { FC } from 'react';
import { Box } from '@mui/material';
import { COLORS } from '@/styles';

interface Props {
  color?: string
}

export const Indicator: FC<Props> = ({ color = COLORS.GREEN }) => {
  return (
    <Box
      sx={{
        width: '6px',
        height: '6px',
        borderRadius: '3px',
        background: color,
        mr: 1.5,
        animation: 'blink 1.5s infinite ease-in-out',
        '@keyframes blink': {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1 }
        }
      }}
    />
  );
}