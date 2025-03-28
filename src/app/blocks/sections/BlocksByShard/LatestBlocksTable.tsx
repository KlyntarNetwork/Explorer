import { FC } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Tooltip
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from 'next/link';
import { BlockPreview } from '@/definitions';
import { FlexCenterBox, ButtonPagination } from '@/components/ui';
import { fetchBlocksByShard } from '@/data';
import { BLOCKS_PER_PAGE } from '@/constants';
import { truncateMiddle } from '@/helpers';

interface LatestBlocksTableProps {
  shard: string;
  currentPage: number;
}

export const LatestBlocksTable: FC<LatestBlocksTableProps> = async ({
  shard,
  currentPage
}) => {
  const blocks = await fetchBlocksByShard(shard, currentPage);
  const blocksExist = !!blocks.length;

  const rows = blocks.map((block: BlockPreview) => (
    <TableRow key={block.sid}>
      <TableCell sx={{ width: '20%' }}>
        <Link
          href={`/blocks/${block.id}`}
          passHref
          style={{ textDecoration: 'none' }}
        >
          <Typography color='primary.main' sx={{ fontSize: '16px' }}>
            <LaunchIcon color='primary' sx={{ position: 'relative', bottom: '-4px', height: '20px' }} /> {block.sid}
          </Typography>
        </Link>
      </TableCell>
      <TableCell sx={{ width: '20%' }}>
        <Typography sx={{ fontSize: '16px' }}>{truncateMiddle(block.creator)}</Typography>
      </TableCell>
      <TableCell sx={{ width: '20%' }}>
        <Typography sx={{ fontSize: '16px' }}>{block.index}</Typography>
      </TableCell>
      <TableCell sx={{ width: '20%' }}>
        <Typography sx={{ fontSize: '16px' }}>{block.txsNumber}</Typography>
      </TableCell>
      <TableCell sx={{ width: '20%' }}>
        <Typography sx={{ fontSize: '16px' }}>{block.createdAt}</Typography>
      </TableCell>
    </TableRow>
  ));

  if (!blocksExist) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography color='primary.main'>No blocks found</Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label='Latest blocks table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <Tooltip title='Absolute height of block in shard'><Typography variant='h6'>SID</Typography></Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title='Address of the block creator'><Typography variant='h6'>Creator</Typography></Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title='Index of block in current epoch by this creator'><Typography variant='h6'>Index</Typography></Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title='Number of transactions in the block'><Typography variant='h6'>Txs Number</Typography></Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title='Timestamp when the block was created'><Typography variant='h6'>Created at</Typography></Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </TableContainer>

      <FlexCenterBox sx={{ my: 5 }}>
        <ButtonPagination
          disabled={blocks.length < BLOCKS_PER_PAGE}
        />
      </FlexCenterBox>
    </>
  );
}
