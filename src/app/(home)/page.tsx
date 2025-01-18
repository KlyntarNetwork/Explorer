export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { Grid } from '@mui/material';
import {
  BlockchainInfoSearchBar,
  KeyWordsTicker,
  NetworkParameters,
  NetworkStatus
} from './sections';
import { fetchBlockchainData } from '@/data';
import { PageContainer } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Home',
};

export default async function HomePage() {
  const blockchainData = await fetchBlockchainData();

  return (
    <>
      <BlockchainInfoSearchBar data={blockchainData} />
      <KeyWordsTicker />
      <PageContainer sx={{ pt: 10, pb: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} lg={6}>
            <NetworkParameters data={blockchainData} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <NetworkStatus data={blockchainData} />
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
}
