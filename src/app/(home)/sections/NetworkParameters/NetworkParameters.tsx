import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { RedGradientBackground } from '@/components/ui';
import { BlockchainData } from '@/definitions';

interface Props {
  data: BlockchainData
}

export const NetworkParameters:FC<Props> = async ({ data }) => {
  return (
    <RedGradientBackground sx={{ p: 3, pb: {xl:13,sm:10} }}>
      <Typography variant='h1'>
        Network Parameters
      </Typography>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <ContentItem title='Network ID' value={data.chainInfo.networkId} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Validator stake size' value={data.chainInfo.validatorStakeSize} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Core major version' value={data.chainInfo.coreMajorVersion} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Quorum size' value={data.chainInfo.quorumSize} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Minimal stake size' value={data.chainInfo.minimalStakePerEntity} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Epoch duration' value={data.chainInfo.epochDuration} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Leader timeframe' value={data.chainInfo.leaderTimeframe} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Slot time(block time)' value={data.chainInfo.slotTime} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Max block size' value={data.chainInfo.maxBlockSize} />
        </Grid>
      </Grid>
    </RedGradientBackground>
  );
}

const ContentItem: FC<{ title: string, value: string | number }> = ({
  title,
  value
}) => {
  return (
    <Box sx={{ px: 1, pb: 0.5 }} border={1} borderColor='border.main'>
      <Typography variant='caption' color='text.secondary'>{title}</Typography>
      <Typography sx={{ fontWeight: 700, wordBreak: 'break-word' }}>{value}</Typography>
    </Box>
  );
}