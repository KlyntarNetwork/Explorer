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
      <CardsGrid>
        {parameterItems.map((item) => (
          <ParameterCard key={item.title} {...item} />
        ))}
      </CardsGrid>
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
      gap: 2.5,
      px: { xs: 2.5, sm: 3, md: 4 },
      py: { xs: 3, md: 4 },
      backgroundColor: 'rgba(14, 14, 14, 0.92)',
      borderRadius: 14,
      border: '1px solid rgba(255, 255, 255, 0.06)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.32)',
      backdropFilter: 'blur(10px)',
      height: '100%',
    }}
  >
    <Typography
      variant="h2"
      sx={{
        fontSize: { xs: '1.35rem', md: '1.55rem' },
        fontWeight: 600,
        letterSpacing: 0.2,
        color: 'rgba(255, 255, 255, 0.94)',
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

const CardsGrid: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      display: 'grid',
      gap: { xs: 1.5, md: 2 },
      gridTemplateColumns: {
        xs: 'repeat(1, minmax(0, 1fr))',
        sm: 'repeat(2, minmax(0, 1fr))',
        xl: 'repeat(3, minmax(0, 1fr))',
      },
    }}
  >
    {children}
  </Box>
);

const ParameterCard: FC<ParameterItem> = ({ icon: Icon, title, value, description }) => (
  <CardRoot>
    <IconHolder>
      <Icon fontSize="small" />
    </IconHolder>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.94)',
            flex: '1 1 auto',
            minWidth: 0,
          }}
        >
          {title}
        </Typography>
        <ValueBadge>{value}</ValueBadge>
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: 'rgba(255, 255, 255, 0.6)',
          lineHeight: 1.4,
        }}
      >
        {description}
      </Typography>
    </Box>
  </CardRoot>
);

const CardRoot: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      alignItems: 'flex-start',
      gap: 1.5,
      padding: { xs: '1.25rem 1.35rem', md: '1.35rem 1.5rem' },
      backgroundColor: 'rgba(20, 20, 20, 0.92)',
      borderRadius: 12,
      border: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'border-color 0.2s ease, transform 0.2s ease, background-color 0.2s ease',
      ':hover': {
        transform: 'translateY(-2px)',
        borderColor: 'rgba(255, 255, 255, 0.12)',
        backgroundColor: 'rgba(28, 28, 28, 0.94)',
      },
      minHeight: { xs: 132, md: 140 },
    }}
  >
    {children}
  </Box>
);

const IconHolder: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      width: 48,
      height: 48,
      borderRadius: 12,
      background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), rgba(255,255,255,0.05))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255, 255, 255, 0.9)',
      flexShrink: 0,
    }}
  >
    {children}
  </Box>
);

const ValueBadge: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      flexShrink: 0,
      maxWidth: { xs: '100%', md: '46%' },
      px: 1.25,
      py: 0.5,
      borderRadius: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      color: 'rgba(255, 255, 255, 0.92)',
      fontSize: '0.78rem',
      fontWeight: 600,
      lineHeight: 1.3,
      wordBreak: 'break-word',
      textAlign: 'right',
    }}
  >
    {children ?? 'N/A'}
  </Box>
);

