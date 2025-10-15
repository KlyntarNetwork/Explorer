import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { RedGradientBackground } from '@/components/ui';
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
    <RedGradientBackground
      sx={{
        p: { xs: 3, md: 4 },
        pb: { xl: 13, sm: 10 },
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
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
          '--NetworkParameter-minHeight': '112px',
        }}
      >
        {parameters(data).map(({ title, value, md = 6 }) => (
          <Grid item xs={12} md={md} key={title} sx={{ display: 'flex' }}>
            <ContentItem title={title} value={value} prominent={md === 12} />
          </Grid>
        ))}
      </Grid>
    </RedGradientBackground>
  );
}

const ContentItem: FC<{ title: string, value: string | number, prominent?: boolean }> = ({
  title,
  value,
  prominent,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 1.5,
        width: '100%',
        px: { xs: 2, md: 2.5 },
        py: { xs: 2, md: 2.5 },
        borderRadius: 3,
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: prominent ? 12 : 10,
              height: prominent ? 12 : 10,
              borderRadius: '50%',
              backgroundColor: prominent ? 'rgba(255, 87, 110, 0.9)' : 'rgba(255, 255, 255, 0.32)',
              boxShadow: prominent
                ? '0 0 0 4px rgba(255, 87, 110, 0.24)'
                : '0 0 0 4px rgba(255, 255, 255, 0.08)',
            }}
          />
        </Box>
        <Typography
          variant='overline'
          sx={{
            letterSpacing: 0.8,
            fontWeight: 600,
            textTransform: 'uppercase',
            color: 'text.secondary',
          }}
        >
          {title}
        </Typography>
      </Box>

      <Typography
        component='span'
        sx={{
          fontSize: { xs: 20, md: 22 },
          fontWeight: 700,
          wordBreak: 'break-word',
          color: 'text.primary',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
