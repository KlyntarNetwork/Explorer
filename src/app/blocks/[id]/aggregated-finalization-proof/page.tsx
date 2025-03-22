import { Metadata } from 'next';
import { ContentBlock, PageContainer } from '@/components/ui';
import { Grid, Typography } from '@mui/material';
import { PrettyJSON } from '@/components';
import { fetchAggregatedFinalizationProof } from '@/data';

interface AggregatedFinalizationProofProps {
  params: {
    id: string;
  }
}

export const metadata: Metadata = {
  title: 'Aggregated Finalization Proof',
};

export default async function AggregatedFinalizationProofPage({ params }: AggregatedFinalizationProofProps) {
  const id = decodeURIComponent(params.id);
  const aggregatedFinalizationProof = await fetchAggregatedFinalizationProof(id);

  return (
    <PageContainer sx={{ py: 6 }}>
      <Typography variant='h1'>Aggregated Finalization Proof (AFP)</Typography>
      <Typography sx={{ mt: 1, mb: 6 }}>A set of signatures from a majority of a quorum (2/3) that finalizes this block with a given ID and hash</Typography>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <ContentBlock
            title='Block Id:'
            value={aggregatedFinalizationProof.blockID}
            url={`/blocks/${aggregatedFinalizationProof.blockID}`}
          />
        </Grid>
        <Grid item xs={12}>
          <ContentBlock>
            <PrettyJSON data={aggregatedFinalizationProof} />
          </ContentBlock>
        </Grid>
      </Grid>
    </PageContainer>
  );
}