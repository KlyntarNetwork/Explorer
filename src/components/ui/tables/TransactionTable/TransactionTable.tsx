'use client';
import React, { ChangeEvent, FC, ReactNode, useState } from 'react';
import Link from 'next/link';
import { TransactionPreview } from '@/definitions';
import { TRANSACTIONS_PER_PAGE } from '@/constants';
import { truncateMiddle } from '@/helpers';
import { FlexBetweenBox, FlexCenterBox, GeometricButton, Label, LoadMoreButton } from '@/components/ui';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TextField,
  Tooltip,
} from '@mui/material';
import { BG_COLORS } from '@/styles';
import LaunchIcon from '@mui/icons-material/Launch';
import SearchIcon from '@public/icons/ui/search.svg';
import Web3 from 'web3';

interface Props {
  transactions: TransactionPreview[]
}

export const TransactionsTable: FC<Props> = ({
 transactions
}) => {
  const [txs, setTxs] = useState(transactions.slice(0, TRANSACTIONS_PER_PAGE));
  const [query, setQuery] = useState('');
  const nextPage = Math.floor(txs.length / TRANSACTIONS_PER_PAGE) + 1;
  const nextPageAvailable = txs.length < transactions.length;

  const filteredTxs = query ? txs.filter(tx => tx.txid.includes(query)) : txs;

  const handleLoadMore = () => {
    if (nextPageAvailable) {
      setTxs(transactions.slice(0, TRANSACTIONS_PER_PAGE * nextPage));
    }
  }

  const handleSetQuery = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value.trim());

  if (!transactions.length) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography color='primary.main'>No transactions found</Typography>
      </Box>
    );
  }

  const withCreator = !!txs[0].creator;

  const TxTableCell = ({ children, alignCenter }: { children: ReactNode; alignCenter?: boolean }) => (
    <TableCell sx={{ width: withCreator ? '20%' : '25%' }} align={alignCenter ? 'center' : 'left'}>
      {children}
    </TableCell>
  );
  
  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        mt: 3
      }}>
        <Box sx={{
          width: {
            lg: 'calc(50% - 24px)',
            xs: '100%'
          }
        }}>
          <TransactionSearchBar handleSetQuery={handleSetQuery} />
        </Box>
      </Box>

      <TableContainer sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label='Transactions table'>
          <TableHead>
            <TableRow>
              <TableCell><Tooltip title='Hash of transaction'><Typography variant='h6'>TxID</Typography></Tooltip></TableCell>
              <TableCell><Tooltip title='Execution status'><Typography variant='h6'>Status</Typography></Tooltip></TableCell>
              {withCreator && (
                <TableCell><Tooltip title='Pubkey-initiator of transaction'><Typography variant='h6'>Creator</Typography></Tooltip></TableCell>
              )}
              <TableCell><Tooltip title='Type of transaction'><Typography variant='h6'>TxType</Typography></Tooltip></TableCell>
              <TableCell><Tooltip title='Fee to prioritize the transaction'><Typography variant='h6'>Priority fee</Typography></Tooltip></TableCell>
              <TableCell><Tooltip title='Required + priority fees'><Typography variant='h6'>Total fee</Typography></Tooltip></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTxs.map((tx) => (
              <TableRow key={tx.txid}>
                <TxTableCell>
                  <Link
                    href={`/tx/${tx.txid}`}
                    passHref
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography color='primary.main' sx={{ fontSize: '16px' }}>
                      <LaunchIcon color='primary' sx={{ position: 'relative', bottom: '-4px', height: '20px' }} />{' '}
                      {truncateMiddle(tx.txid)}
                    </Typography>
                  </Link>
                </TxTableCell>
                <TxTableCell>
                  <Label variant='green'>Success</Label>
                </TxTableCell>
                {tx.creator && (
                  <TxTableCell>
                    <Typography sx={{ fontSize: '16px' }}>{truncateMiddle(tx.creator)}</Typography>
                  </TxTableCell>
                )}
                <TxTableCell>
                  <Typography sx={{ fontSize: '16px' }}>{tx.txType}</Typography>
                </TxTableCell>
                <TxTableCell>
                  <Typography sx={{ fontSize: '16px' }}>{tx.priorityFee ? Web3.utils.fromWei(tx.priorityFee,'ether') : '0'}</Typography>
                </TxTableCell>
                <TxTableCell>
                  <Typography sx={{ fontSize: '16px' }}>{ tx.totalFee === 'N/A' ? 'N/A' : Web3.utils.fromWei(tx.totalFee,'ether')}</Typography>
                </TxTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FlexCenterBox sx={{ my: 3 }}>
        {nextPageAvailable && !query && (
          <LoadMoreButton onClick={handleLoadMore}/>
        )}
      </FlexCenterBox>
    </>
  );
}

const TransactionSearchBar = ({
  handleSetQuery
}: {
  handleSetQuery: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <FlexBetweenBox
      border={1}
      borderColor='border.main'
      sx={{
        gap: 2,
        pl: 1.5,
        pr: 0.4,
        background: BG_COLORS.GRAY_LIGHT
      }}
    >
      <TextField
        onChange={handleSetQuery}
        sx={{ width: '100%' }}
        autoComplete='off'
        spellCheck={false}
        inputProps={{ maxLength: 200 }}
        placeholder='Enter the txID - BLAKE3(KLY) or SHA3(EVM) hash of transaction'
      />
      <GeometricButton
        variant='cyan'
        disableShadow={true}
        sx={{ py: 0.75, cursor: 'default' }}
      >
        <SearchIcon />
      </GeometricButton>
    </FlexBetweenBox>
  );
}