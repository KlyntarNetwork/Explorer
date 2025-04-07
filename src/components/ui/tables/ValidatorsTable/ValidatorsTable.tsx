'use client';

import { Box, Typography } from '@mui/material';
import { BG_COLORS } from '@/styles';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';

import React, { ChangeEvent, FC, ReactNode, useState } from 'react';

import { FlexBetweenBox, FlexCenterBox, GeometricButton, Label, LoadMoreButton } from '@/components/ui';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

import SearchIcon from '@public/icons/ui/search.svg';



interface InfoBlockProps {
  value: Array<{text: string; url: string; inQuorum: boolean;}>
}


export const VadlidatorsTable: FC<InfoBlockProps> = ({
  value
}) => {
   const [validators, setValidators] = useState(value.slice(0,25));
   const [query, setQuery] = useState('');

   const nextPage = Math.floor(value.length / 25) + 1;
   const nextPageAvailable = validators.length < value.length;

 
   const filteredValue = query ? value.filter(validator => validator.text.includes(query)) : validators;
 
   const handleLoadMore = () => {
     if (nextPageAvailable) {
       setValidators(value.slice(0, 25 * nextPage));
     }
   }


   const handleSetQuery = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value.trim());
 

  const ValidatorTableCell = ({ children }: { children: ReactNode }) => (
    <TableCell sx={{ width: '20%' }}>
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
           <ValidatorSearchBar handleSetQuery={handleSetQuery} />
         </Box>
       </Box>
 
       <TableContainer sx={{ mt: 2 }}>
         <Table sx={{ minWidth: 650 }} aria-label='Transactions table'>
           <TableHead>
             <TableRow>
               <TableCell><Typography variant='h6'>ValidatorID</Typography></TableCell>
               <TableCell><Typography variant='h6'>Alias</Typography></TableCell>
               <TableCell><Typography variant='h6'>In quorum</Typography></TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {filteredValue.map((validatorData) => (
               <TableRow key={validatorData.text}>
                 <ValidatorTableCell>
                   <Link
                     href={`${validatorData.url}`}
                     passHref
                     style={{ textDecoration: 'none' }}
                   >
                     <Typography color='primary.main' sx={{ fontSize: '16px' }}>
                       <LaunchIcon color='primary' sx={{ position: 'relative', bottom: '-4px', height: '20px' }} />{' '}
                       {validatorData.text}
                     </Typography>
                   </Link>
                 </ValidatorTableCell>
                 <ValidatorTableCell>
                  <Typography sx={{ fontSize: '16px' }}>
                    N/A
                  </Typography>
                </ValidatorTableCell>
                 <ValidatorTableCell>
                  <Typography sx={{ fontSize: '16px' }}>
                    <Label variant={validatorData.inQuorum ? "green" : "red"}>{validatorData.inQuorum ? 'Yes' : 'No'}</Label>
                  </Typography>
                </ValidatorTableCell>
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
 


const ValidatorSearchBar = ({
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
        placeholder='Enter the validator pubkey'
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