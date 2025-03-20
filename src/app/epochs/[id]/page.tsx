import { Metadata } from 'next';
import { NavButton, InfoBlock, PageContainer, FlexBetweenBox } from '@/components/ui';
import { Grid, Typography } from '@mui/material';
import { fetchEpochById } from '@/data';
import { FormattedDate } from '@/helpers';
import { ValidatorsQuorumSection } from './ValidatorsQuorumSection';

interface Props {
  params: {
    id: string;
  }
}

export const metadata: Metadata = {
  title: 'Epoch info',
};

export default async function PoolByIdPage({ params }: Props) {
  const id = decodeURIComponent(params.id);
  const epoch = await fetchEpochById(Number(id));

  const startedAt = new FormattedDate(epoch.startTimestamp).UTCHoursMinutesSeconds;

  const previousEpochRoute = `/epochs/${epoch.isFirst ? epoch.id : epoch.id - 1}`;
  const nextEpochRoute = `/epochs/${epoch.isCurrent ? epoch.id : epoch.id + 1}`;

  return (
    <PageContainer sx={{ py: 6 }}>
      <FlexBetweenBox>
        <NavButton
          url={previousEpochRoute}
          variant='back'
          label='Previous epoch'
          sx={{ mb: 2 }}
          disabled={epoch.isFirst}
        />
        <NavButton
          url={nextEpochRoute}
          variant='forward'
          label='Next epoch'
          sx={{ mb: 2 }}
          disabled={epoch.isCurrent}
        />
      </FlexBetweenBox>
      <Typography variant='h1'>{epoch.isCurrent ? `Current epoch` : `Epoch`} data</Typography>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <InfoBlock
            title='Started at'
            value={startedAt}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoBlock
            title='Epoch index'
            value={epoch.id}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoBlock
            title='Shards'
            value={epoch.shardsNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoBlock
            title='Quorum size'
            value={epoch.quorumSize}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoBlock
            title='Total validators'
            value={epoch.validatorsNumber}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoBlock
            title='Blocks number'
            value={epoch.totalBlocksNumber}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoBlock
            title='Transactions number'
            value={epoch.totalTxsNumber}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoBlock
            title='Txs success rate'
            value={epoch.txsSuccessRate}
          />
        </Grid>
        <Grid item xs={12}>
          <InfoBlock
            title='Epoch hash'
            value={epoch.hash}
          />
        </Grid>
      </Grid>

      <ValidatorsQuorumSection epoch={epoch} />
    </PageContainer>
  );
}