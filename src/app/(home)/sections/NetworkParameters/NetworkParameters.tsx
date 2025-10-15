import { FC, ElementType, ReactNode } from 'react';
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
import { BlockchainData } from '@/definitions';

interface Props {
  data: BlockchainData;
}

interface ParameterItem {
  title: string;
  value: string | number;
  description: string;
  icon: ElementType;
}

export const NetworkParameters: FC<Props> = async ({ data }) => {
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
    <SectionWrapper title="Network parameters">
      {parameterItems.map((item) => (
        <ParameterRow key={item.title} {...item} />
      ))}
    </SectionWrapper>
  );
};

interface SectionWrapperProps {
  title: string;
  children: ReactNode;
}

const SectionWrapper: FC<SectionWrapperProps> = ({ title, children }) => (
  <Box
    component="section"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      px: { xs: 2.5, sm: 3, md: 4 },
      py: { xs: 3, md: 4 },
      background: 'linear-gradient(135deg, rgba(12, 12, 12, 0.95), rgba(6, 6, 6, 0.92))',
      borderRadius: { xs: 18, md: 24 },
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 18px 35px rgba(0, 0, 0, 0.35)',
      backdropFilter: 'blur(12px)',
    }}
  >
    <Typography
      variant="h2"
      sx={{
        fontSize: { xs: '1.5rem', md: '1.75rem' },
        fontWeight: 600,
        color: 'rgba(255, 255, 255, 0.95)',
      }}
    >
      {title}
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>{children}</Box>
  </Box>
);

const ParameterRow: FC<ParameterItem> = ({ icon: Icon, title, value, description }) => (
  <CardRoot>
    <IconHolder>
      <Icon fontSize="small" />
    </IconHolder>
    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.92)',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'rgba(255, 255, 255, 0.58)',
          mt: 0.5,
        }}
      >
        {description}
      </Typography>
    </Box>
    <ValuePill>{value}</ValuePill>
  </CardRoot>
);

const CardRoot: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      px: { xs: 2, md: 2.5 },
      py: { xs: 1.75, md: 2 },
      background: 'rgba(20, 20, 20, 0.95)',
      borderRadius: 18,
      border: '1px solid rgba(255, 255, 255, 0.04)',
      transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
      ':hover': {
        transform: 'translateY(-2px)',
        background: 'rgba(28, 28, 28, 0.97)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    }}
  >
    {children}
  </Box>
);

const IconHolder: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      width: 44,
      height: 44,
      borderRadius: 14,
      background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.16), rgba(255,255,255,0.04))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255, 255, 255, 0.88)',
      flexShrink: 0,
    }}
  >
    {children}
  </Box>
);

const ValuePill: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      ml: { xs: 1, md: 2 },
      px: 1.75,
      py: 0.75,
      borderRadius: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}
  >
    {children}
  </Box>
);

