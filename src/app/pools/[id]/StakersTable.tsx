'use client';
import React, { ChangeEvent, FC, useState } from 'react';
import { Stakers } from '@/definitions';
import { STAKERS_PER_PAGE } from '@/constants';
import { truncateMiddle } from '@/helpers';
import { FlexBetweenBox, FlexCenterBox, GeometricButton, LoadMoreButton } from '@/components/ui';
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
} from '@mui/material';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';
import SearchIcon from '@public/icons/ui/search.svg';
import { BG_COLORS } from '@/styles';
import Web3 from 'web3';

const getTableData = (poolStakers: Stakers) => {
  return Object.entries(poolStakers).map(
    ([id, { kly, uno }]) => ({
      id,
      kly,
      uno
    })
  );
}

interface StakersTableProps {
  poolStakers: Stakers,
  poolOriginShard: string,
}

export const StakersTable: FC<StakersTableProps> = ({
  poolStakers, poolOriginShard
}) => {
  const tableStakers = getTableData(poolStakers);

  const [stakers, setStakers] = useState(tableStakers.slice(0, STAKERS_PER_PAGE));
  const [query, setQuery] = useState('');
  const nextPage = Math.floor(stakers.length / STAKERS_PER_PAGE) + 1;
  const nextPageAvailable = stakers.length < tableStakers.length;

  const filteredStakers = query ? stakers.filter(st => st.id.includes(query)) : stakers;

  const handleLoadMore = () => {
    if (nextPageAvailable) {
      setStakers(tableStakers.slice(0, STAKERS_PER_PAGE * nextPage));
    }
  }

  const handleSetQuery = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value.trim());

  if (!tableStakers.length) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography color='primary.main'>No stakers found</Typography>
      </Box>
    );
  }

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
          <StakerSearchBar handleSetQuery={handleSetQuery} />
        </Box>
      </Box>

      <TableContainer sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label='Stakers table'>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant='h6'>ID</Typography></TableCell>
              <TableCell><Typography variant='h6'>KLY</Typography></TableCell>
              <TableCell><Typography variant='h6'>UNO</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStakers.map((st) => (
              <TableRow key={st.id}>
                <TableCell sx={{ width: '33%' }}>
                  <Link
                    href={`/users/${poolOriginShard}:${st.id}`}
                    passHref
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography color='primary.main' sx={{ fontSize: '16px' }}>
                      <LaunchIcon color='primary' sx={{ position: 'relative', bottom: '-4px', height: '20px' }} />{' '}
                      {truncateMiddle(st.id)}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell sx={{ width: '33%' }}>
                  <Typography sx={{ fontSize: '16px' }}>{Web3.utils.fromWei(st.kly,'ether')}</Typography>
                </TableCell>
                <TableCell sx={{ width: '33%' }}>
                  <Typography sx={{ fontSize: '16px' }}>{Web3.utils.fromWei(st.uno,'ether')}</Typography>
                </TableCell>
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

const StakerSearchBar = ({
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
        placeholder='Enter the ID of the staker'
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
