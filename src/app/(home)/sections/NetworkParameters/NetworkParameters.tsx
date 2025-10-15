import { FC, ElementType } from 'react';
import { Box, Typography } from '@mui/material';
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
    <RedGradientBackground
      sx={{
        p: { xs: 3, md: 4 },
        pb: { xl: 13, sm: 10 },
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography variant='h1'>
        Network Parameters
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 2, md: 2.5 },
          gridTemplateColumns: {
            xs: 'repeat(1, minmax(0, 1fr))',
            md: 'repeat(2, minmax(0, 1fr))',
            xl: 'repeat(3, minmax(0, 1fr))',
          },
        }}
      >
        {parameterItems.map((item) => (
          <ParameterCard key={item.title} {...item} />
        ))}
      </Box>
    </RedGradientBackground>
  );
};

const ParameterCard: FC<ParameterItem> = ({ icon: Icon, title, value, description }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: { xs: 2, md: 2.5 },
        borderRadius: 20,
        background: 'rgba(12, 12, 12, 0.82)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(14px)',
        transition: 'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease',
        ':hover': {
          transform: 'translateY(-2px)',
          background: 'rgba(18, 18, 18, 0.9)',
          borderColor: 'rgba(255, 255, 255, 0.12)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0))',
          color: 'primary.main',
          flexShrink: 0,
        }}
      >
        <Icon fontSize='small' />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, flexGrow: 1 }}>
        <Typography variant='subtitle2' sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>
          {title}
        </Typography>
        <Typography
          variant='h6'
          sx={{ fontWeight: 600, lineHeight: 1.3, wordBreak: 'break-word' }}
        >
          {value}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};