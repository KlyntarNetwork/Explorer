import { Metadata } from 'next';
import { ContentBlock, TransactionsTable, EntityPageLayout, PageContainer } from '@/components/ui';
import { Box, Typography } from '@mui/material';
import { fetchBlockById } from '@/data';
import { TransactionPreview } from '@/definitions';
import BlockImage from '@public/icons/pages/block.svg';

interface Props {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Block info',
};

export default async function BlockByIdPage({ params }: Props) {
  const id = decodeURIComponent(params.id);
  const block = await fetchBlockById(id);

  const status = !!block.aggregatedFinalizationProof.proofs ? 'Approved' : 'Awaiting approval';
  
  const txPreviews: TransactionPreview[] = block.transactions.map(tx => ({
    txid: tx.txHash,
    txType: tx.type,
    sigType: tx.sigType,
    priorityFee: tx.fee,
    totalFee: 'N/A',
    creator: tx.creator
  }));

  return (
    <PageContainer sx={{ py: 6 }}>
      <EntityPageLayout
        header={{
          title: 'Block info',
          clipBoardValue: block.id,
          value: block.truncatedId,
          label: {
            variant: status === 'Approved' ? 'green' : 'red',
            value: status
          },
          actionText: {
            url: `/blocks/${id}/aggregated-finalization-proof`,
            value: 'Check AFP'
          }
        }}
        items={[
          <ContentBlock key='creator' title='Creator:' url={`/pools/${block.creator}(POOL)`} value={block.creator}/>,
          <ContentBlock key='created_at' title='Created at:' value={block.createdAt}/>,
          <ContentBlock key='epoch' title='Epoch:' url={`/epochs/${block.epochId}`} value={block.epoch}/>,
          [
            <ContentBlock key='txs_number' title='Txs Number:' value={block.txsNumber}/>,
            <ContentBlock key='index_in_own_sequence' title='Index in own sequence:' value={block.index}/>,
          ],
          <ContentBlock key='this_block_hash' title='This block hash:' value={block.aggregatedFinalizationProof.blockHash}/>,
          <ContentBlock key='previous_block_hash' title='Previous block hash:' value={block.prevHash}/>
        ]}
      >
        <BlockImage width={421} height={426} viewBox='0 0 421 426' />
      </EntityPageLayout>

      <Box sx={{ mt: 16 }}>
        <Typography variant='h1'>Transactions</Typography>
        <TransactionsTable transactions={txPreviews} />
      </Box>
    </PageContainer>
  );
}