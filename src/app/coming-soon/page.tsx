'use client';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import { logUserAction } from '@/helpers';
import { USER_ACTIONS } from '@/constants';

const ComingSoonPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    logUserAction(USER_ACTIONS.GO_BACK_FROM_COMING_SOON_PAGE);
    router.back();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '75vh'
      }}
    >
      <Typography variant='h6' sx={{ mb: 4 }}>
        Page coming soon
      </Typography>
      <Button variant='contained' onClick={handleGoBack}>
        Go back
      </Button>
    </Box>
  );
};

export default ComingSoonPage;
