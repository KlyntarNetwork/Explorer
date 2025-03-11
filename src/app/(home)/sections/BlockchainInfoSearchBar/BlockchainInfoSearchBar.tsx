import { FC } from 'react';
import { Grid } from '@mui/material';
import { GradientBackground, DimGradientBackground, PageContainer } from '@/components/ui';
import { ContentBlock } from '@/components/ui';
import { ExplorerSearchBar } from './ExplorerSearchBar';
import { BlockchainData } from '@/definitions';

interface Props {
  data: BlockchainData
}

export const BlockchainInfoSearchBar: FC<Props> = async ({ data }) => {
  return (
    <DimGradientBackground>
      <GradientBackground sx={{ pt: 6, pb: 14 }}>
        <PageContainer>
          <ExplorerSearchBar />
          <Grid container spacing={1} sx={{ mt: 4 }}>
            <HomeInfoBlock title='Total TXS' value={data.totalTxsNumber} variant='red'/>
            <HomeInfoBlock title='Epoch ID' value={data.epochId} variant='red'/>
            <HomeInfoBlock title='TXS Success' value={data.txsSuccessRate} variant='red'/>
            <HomeInfoBlock title='Shards' value={data.shardsNumber} variant='red'/>
            <HomeInfoBlock title='Validators' value={data.validatorsNumber} variant='red'/>
            <HomeInfoBlock title='Total Staked' value={data.totalStaked} variant='red'/>
            <HomeInfoBlock title='Market Cap' value='SOON' />
            <HomeInfoBlock title='Coin Price' value='SOON' />
          </Grid>
        </PageContainer>
      </GradientBackground>
    </DimGradientBackground>
  );
}

const HomeInfoBlock: FC<{ title: string, value: string | number, variant?: 'red' }> = ({
  title,
  value,
  variant
}) => {
  return (
    <Grid item xl={1.5} md={3} sm={4} xs={12}>
      <ContentBlock
        title={title}
        value={value}
        variant={variant}
        blurred={true}
      />
    </Grid>
  );
}