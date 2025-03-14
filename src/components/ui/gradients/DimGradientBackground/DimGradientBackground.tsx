import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

export const DimGradientBackground: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box sx={{
      background: `
          linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, transparent 36%, transparent 64%, rgba(0, 0, 0, 1) 100%),
          rgba(0,0,0,0.5)
        `
    }}>
      {children}
    </Box>
  );
}