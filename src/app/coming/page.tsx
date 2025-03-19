'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, Box } from '@mui/material';
import { PageContainer } from '@/components/ui';
import { fetchBlockchainData, fetchRecentTotalBlocksAndTxs } from '@/data';
import { TransactionsChart } from '../blocks/sections/GeneralBlocksInfo/TransactionsChart';
import { RecentBlockStats } from '@/definitions';

const ComingSoonPage = () => {
  const router = useRouter();

  const [recentBlockStats, setRecentBlockStats] = useState<RecentBlockStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const blockStats = await fetchRecentTotalBlocksAndTxs(14);
      setRecentBlockStats(blockStats);
    };

    fetchData();
  }, []);

  return (
    <PageContainer sx={{ py: 6 }}>
      <Typography variant='h1'>General info about blocks</Typography>
      <Typography sx={{ mt: 1 }}>For this epoch and during the whole time</Typography>

      <Box sx={{ mt: 5, minHeight: '300px' }}>
        {recentBlockStats ? (
          <TransactionsChart recentBlockStats={recentBlockStats} />
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>

      <Typography variant='h1'>General info about blocks</Typography>
      <Typography sx={{ mt: 1 }}>For this epoch and during the whole time</Typography>

      <Box sx={{ mt: 5, minHeight: '300px' }}>
        {recentBlockStats ? (
          <TransactionsChart recentBlockStats={recentBlockStats} />
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>

      <Typography variant='h1'>General info about blocks</Typography>
      <Typography sx={{ mt: 1 }}>For this epoch and during the whole time</Typography>

      <Box sx={{ mt: 5, minHeight: '300px' }}>
        {recentBlockStats ? (
          <TransactionsChart recentBlockStats={recentBlockStats} />
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </PageContainer>
  );
};

export default ComingSoonPage;
