import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { BlockchainData } from '@/definitions';

interface Props {
  data: BlockchainData
}

const parameters = (
  data: BlockchainData,
) => ([
  { title: 'Network ID', value: data.chainInfo.networkId, md: 12 },
  { title: 'Validator stake size', value: data.chainInfo.validatorStakeSize },
  { title: 'Core major version', value: data.chainInfo.coreMajorVersion },
  { title: 'Quorum size', value: data.chainInfo.quorumSize },
  { title: 'Minimal stake size', value: data.chainInfo.minimalStakePerEntity },
  { title: 'Epoch duration', value: data.chainInfo.epochDuration },
  { title: 'Leader timeframe', value: data.chainInfo.leaderTimeframe },
  { title: 'Slot time(block time)', value: data.chainInfo.slotTime },
  { title: 'Max block size', value: data.chainInfo.maxBlockSize },
]);

export const NetworkParameters:FC<Props> = async ({ data }) => {
  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        backgroundColor: '#000',
        borderRadius: 3,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0px 24px 48px rgba(0, 0, 0, 0.35)',
        height: '100%',
        minHeight: { xs: 420, md: 460 },
      }}
    >
      <Typography variant='h1' sx={{ fontSize: { xs: 24, md: 28 }, fontWeight: 700 }}>
        Network Parameters
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          mt: 0,
          '--NetworkParameter-minHeight': '72px',
        }}
      >
        {parameters(data).map(({ title, value, md = 6 }) => (
          <Grid item xs={12} md={md} key={title} sx={{ display: 'flex' }}>
            <ContentItem title={title} value={value} prominent={md === 12} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const ContentItem: FC<{ title: string, value: string | number, prominent?: boolean }> = ({
  title,
  value,
  prominent,
}) => {
  const normalizedValue = (() => {
    if (value === undefined || value === null) {
      return 'N/A';
    }

    if (typeof value === 'number') {
      return value.toLocaleString();
    }

    const trimmed = value.trim();

    return trimmed.length > 0 ? trimmed : 'N/A';
  })();

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        width: '100%',
        px: { xs: 1.5, md: 1.75 },
        py: { xs: 1.5, md: 1.75 },
        borderRadius: 2.5,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.35) 0%, rgba(255, 255, 255, 0.04) 100%)',
        boxShadow: '0px 24px 48px rgba(0, 0, 0, 0.35)',
        transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
        minHeight: 'var(--NetworkParameter-minHeight)',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: 'rgba(255, 255, 255, 0.24)',
          boxShadow: '0px 32px 64px rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: 1.5,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          mt: 0.5,
        }}
      >
        <Box
          sx={{
            width: prominent ? 11 : 9,
            height: prominent ? 11 : 9,
            borderRadius: '50%',
            backgroundColor: prominent ? 'rgba(255, 87, 110, 0.9)' : 'rgba(255, 255, 255, 0.32)',
            boxShadow: prominent
              ? '0 0 0 4px rgba(255, 87, 110, 0.24)'
              : '0 0 0 4px rgba(255, 255, 255, 0.08)',
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography
          variant='subtitle2'
          component='span'
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {normalizedValue}
        </Typography>
      </Box>
    </Box>
  );
}
