import React from 'react';
import { Metadata } from 'next';
import NotFoundPage from '@/app/not-found';
import { Box, Typography } from '@mui/material';
import { ContentBlock, EntityPageLayout, Label, PageContainer, TransactionsTable } from '@/components/ui';
import { fetchAccountById, fetchAccountTransactions } from '@/data';
import { truncateMiddle } from '@/helpers';
import { UserAccount} from '@/definitions';
import AccountImage from '@public/icons/pages/account.svg';
import Web3 from 'web3';

export const metadata: Metadata = {
  title: 'Account info',
};

interface Props {
  params: {
    id: string
  }
}

export default async function AccountByIdPage({ params }: Props) {
  let [shard, accountId] = decodeURIComponent(params.id).split(':');
  accountId = accountId.startsWith('0x') ? accountId.toLowerCase() : accountId;

  const account = await fetchAccountById(shard, accountId) as UserAccount;
  const transactions  = await fetchAccountTransactions(shard, accountId);

  if(account.type !== 'eoa') return <NotFoundPage/>

  return (
    <PageContainer sx={{ py: 6 }}>
      <EntityPageLayout
        header={{
          title: 'Account info',
          value: truncateMiddle(accountId),
          label: {
            variant: 'green',
            value: 'User'
          }
        }}
        items={[
          <ContentBlock key='account_id' title='Account Id:' value={accountId}/>,
          <ContentBlock key='aliases' title='Also known as:'>
            <Label variant='blue'>N/A</Label>
          </ContentBlock>,
          <ContentBlock key='shard' title='Shard:' value={shard}/>,
          [
            <ContentBlock key='balance' title='Balance:' value={Web3.utils.fromWei(account.balance,'ether') + ' KLY'}/>,
          ],
          [
            <ContentBlock key='nonce' title='Nonce:' value={account.nonce}/>,
            <ContentBlock key='abstract_gas' title='Abstract gas:' value={account.gas}/>
          ]
        ]}
      >
        <AccountImage width={421} height={426} viewBox='0 0 421 426' />
      </EntityPageLayout>

      <Box sx={{ mt: 16 }}>
        <Typography variant='h1'>Transactions</Typography>
        <Typography sx={{ mt: 1, mb: 3 }}>Browse through the latest 200 transactions below</Typography>
        <TransactionsTable transactions={transactions.reverse()} />
      </Box>
    </PageContainer>
  );
}