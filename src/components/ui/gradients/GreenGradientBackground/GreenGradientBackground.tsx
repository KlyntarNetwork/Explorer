import { FC, ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';


const style = {
  background: "linear-gradient(108.74deg, rgba(0, 108, 90, 0.24) 0%, rgba(255, 255, 255, 0.06) 100%)",
  boxShadow: "0px 0px 50px -25px rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(50px)",
  borderRadius: "20px"
}




export const GreenGradientBackground: FC<{
  children: ReactNode,
  sx: SxProps
}> = ({ children, sx }) => {
  return (
    <Box sx={{
      ...sx
    }} style={style}>
      {children}
    </Box>
  );
}