'use client';
import { Box, Typography } from '@mui/material';
import { InfoBlock } from '@/components/ui';
import { Epoch } from '@/definitions';
import React, { FC } from 'react';
import { VadlidatorsTable } from '@/components/ui/tables/ValidatorsTable';


export const ValidatorsQuorumSection: FC<{ epoch: Epoch }> = ({
  epoch
}) => {

  let validatorsSequence;

  if(process.env.MODE_1){

    // In case it's MODE_1 - list the pools registry to show quorum members first

    const quorum = new Set(epoch.quorum);

    validatorsSequence = epoch.poolsRegistry.sort((a, b) => {
      
      return quorum.has(a) && !quorum.has(b) ? -1 : !quorum.has(a) && quorum.has(b) ? 1 : 0;
    
    });

  } else {

    // Otherwise visualize in sequence of leadership

    validatorsSequence = epoch.leadersSequence

  }

  const validatorsData = validatorsSequence.map(validator => ({
    text: validator,
    url: `/pools/${validator}(POOL)`,
    inQuorum: epoch.quorum.includes(validator)
  }));

  return (
    <>
      <Typography variant='h1' sx={{ mt: 10, mb: 2 }}>Epoch validators</Typography>
      <Typography sx={{ mt: 1, mb: 3 }}>List of pools that were ready to protect the decentralization of network</Typography>

      <Box sx={{ mt: 4 }}>
        {validatorsData.length ? (
          <VadlidatorsTable value={validatorsData} />
        ) : (
          <Typography color='primary.main'>No validators found</Typography>
        )}
      </Box>
    </>
  );
}

