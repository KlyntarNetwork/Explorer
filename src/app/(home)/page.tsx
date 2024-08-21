import { Metadata } from 'next';
import * as React from 'react';
import { Container, Grid } from '@mui/material';
import {
  BlockchainInfoSearchBar,
  KeyWordsTicker,
  NetworkParameters,
  NetworkStatus
} from './sections';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <>
      <BlockchainInfoSearchBar />
      <KeyWordsTicker />
      <Container maxWidth='xl' sx={{ pt: 14, pb: 20 }}>
        <Grid container spacing={5} sx={{ px: { md: 4.5, xs: 0 } }}>
          <Grid item xs={12} lg={6}>
            <NetworkParameters />
          </Grid>
          <Grid item xs={12} lg={6}>
            <NetworkStatus />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
