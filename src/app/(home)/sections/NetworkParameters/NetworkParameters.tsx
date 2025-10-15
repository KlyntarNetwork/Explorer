import { FC, ElementType } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SavingsIcon from '@mui/icons-material/Savings';
import Groups2Icon from '@mui/icons-material/Groups2';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MemoryIcon from '@mui/icons-material/Memory';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerIcon from '@mui/icons-material/Timer';
import SpeedIcon from '@mui/icons-material/Speed';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { RedGradientBackground } from '@/components/ui';
import { BlockchainData } from '@/definitions';

interface Props {
  data: BlockchainData
}

type ParameterItem = {
  title: string;
  value: string | number;
  description: string;
  icon: ElementType;
};

export const NetworkParameters:FC<Props> = async ({ data }) => {
  const parameterItems: ParameterItem[] = [
    {
      title: 'Network ID',
      value: data.chainInfo.networkId,
      description: 'Unique identifier of the active KLY layer 1 network.',
      icon: FingerprintIcon,
    },
    {
      title: 'Validator stake size',
      value: data.chainInfo.validatorStakeSize,
      description: 'Required stake to bootstrap a validator slot.',
      icon: AccountBalanceWalletIcon,
    },
    {
      title: 'Core major version',
      value: data.chainInfo.coreMajorVersion,
      description: 'Protocol major version currently enforced on-chain.',
      icon: MemoryIcon,
    },
    {
      title: 'Quorum size',
      value: data.chainInfo.quorumSize,
      description: 'Total validators that must attest for block finality.',
      icon: Groups2Icon,
    },
    {
      title: 'Minimal stake size',
      value: data.chainInfo.minimalStakePerEntity,
      description: 'Lower bound for delegations to participate in staking.',
      icon: SavingsIcon,
    },
    {
      title: 'Epoch duration',
      value: data.chainInfo.epochDuration,
      description: 'Time span for validator rotations and reward cycles.',
      icon: AccessTimeIcon,
    },
    {
      title: 'Leader timeframe',
      value: data.chainInfo.leaderTimeframe,
      description: 'Window in which the scheduled leader proposes a block.',
      icon: TimerIcon,
    },
    {
      title: 'Slot time (block time)',
      value: data.chainInfo.slotTime,
      description: 'Average interval between subsequent block proposals.',
      icon: SpeedIcon,
    },
    {
      title: 'Max block size',
      value: data.chainInfo.maxBlockSize,
      description: 'Maximum bytes allowed for a single block payload.',
      icon: DataObjectIcon,
    },
  ];

  return (
    <RedGradientBackground sx={{ p: { xs: 3, md: 4 }, pb: { xl: 13, sm: 10 } }}>
      <Typography variant='h1' sx={{ mb: 3 }}>
        Network Parameters
      </Typography>
      <Grid container spacing={2.5}>
        {parameterItems.map((item) => (
          <Grid item xs={12} md={6} key={item.title}>
            <ParameterCard {...item} />
          </Grid>
        ))}
      </Grid>
    </RedGradientBackground>
  );
};

const iconContainerSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '14px',
  background: 'rgba(255, 255, 255, 0.08)',
  color: 'primary.main',
  flexShrink: 0,
};

const cardSx = {
  display: 'flex',
  gap: 2,
  alignItems: 'flex-start',
  padding: 24,
  borderRadius: 24,
  background: 'rgba(8, 8, 8, 0.85)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(18px)',
  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.35)',
  transition: 'transform 0.2s ease, border-color 0.2s ease, background 0.2s ease',
  ':hover': {
    transform: 'translateY(-4px)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    background: 'rgba(12, 12, 12, 0.9)',
  },
};

const ParameterCard: FC<ParameterItem> = ({ icon: Icon, title, value, description }) => {
  return (
    <Box sx={cardSx}>
      <Box sx={iconContainerSx}>
        <Icon fontSize='small' />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
        <Typography variant='overline' color='text.secondary'>
          {title}
        </Typography>
        <Typography variant='h5' sx={{ fontWeight: 700, wordBreak: 'break-word' }}>
          {value}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};