import Marquee from 'react-fast-marquee';
import { Box, Typography } from '@mui/material';

// const KEY_WORDS = [
//   'Web2, Web3 & Real World = 1B users',
//   'Ecosystem of blockchains',
//   'Shared security model',
//   'Post-quantum cryptography',
//   'Parallel virtual machines',
//   'Account abstraction 2.0',
//   'Storage abstraction',
//   'Tons of features',
//   'Amazing TPS & TTF',
//   'Mutability',
//   'AI (FHE ML & ZKML)',
//   'Multistaking',
//   'Cloud',
//   'Multilevel sharding',
//   'L1 blockchain',
//   'EVM & WASM & XVM',
//   'Codeless smart-contracts for real world',
//   'RWAs',
//   'Quantum currency',
// ];

const KEY_WORDS = ['Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon', 'Launch soon'];

export const KeyWordsTicker = () => {
  return (
    <Box sx={{ minHeight: '40px' }}>
      <Marquee>
        {KEY_WORDS.map((tag) => (
          <Typography
            key={tag}
            variant='body2'
            border={1}
            borderColor='border.main'
            sx={{
              mx: 0.5,
              px: 1.5,
              py: 0.3,
              height: 'fit-content',
              width: 'max-content'
            }}
          >
            {tag}
          </Typography>
        ))}
      </Marquee>
    </Box>
  );
}
