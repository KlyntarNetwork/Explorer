'use client';
import { Box, Button, Typography } from '@mui/material';
import { majorMonoDisplay } from '@/styles/theme';
import { logUserAction } from '@/helpers';
import { USER_ACTIONS } from '@/constants';

export default function Error() {
  const handleReload = () => {
    logUserAction(USER_ACTIONS.RETRY_ON_ERROR);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '75vh',
      }}
    >
      <Typography variant="h1" sx={{
        mb: 2,
        fontFamily: majorMonoDisplay.style.fontFamily,
        fontSize: '36px'
      }}>
        500
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Something wrong
      </Typography>
      <Button
        variant="contained"
        onClick={handleReload}
      >
        Try again
      </Button>
    </Box>
  );
};
