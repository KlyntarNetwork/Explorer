'use client';

import { ElementType, FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import TimelineIcon from '@mui/icons-material/Timeline';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HubIcon from '@mui/icons-material/Hub';
import LanIcon from '@mui/icons-material/Lan';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import InsightsIcon from '@mui/icons-material/Insights';
import { BlockchainData } from '@/definitions';
import { logUserAction } from '@/helpers';
import { LOCATION, USER_ACTIONS } from '@/constants';

interface Props {
  data: BlockchainData;
}

interface InfoCardItem {
  title: string;
  description: string;
  url: string;
  disabled?: boolean;
  icon: ElementType;
}

export const NetworkStatus: FC<Props> = ({ data }) => {
  const infoCards: InfoCardItem[] = [
    {
      title: 'Blocks data and stats',
      description: 'Inspect recent blocks, validators and throughput metrics.',
      url: '/blocks',
      icon: ViewTimelineIcon,
    },
    {
      title: 'Epochs data',
      description: 'Dive into epoch history, rotation schedules and rewards.',
      url: `/epochs/${data.epochId}`,
      icon: TimelineIcon,
    },
    {
      title: 'Hostchains checkpoints',
      description: 'Track the latest hostchain checkpoints and finality status.',
      url: '/checkpoints',
      icon: CloudDoneIcon,
    },
    {
      title: 'Voting & DAO',
      description: 'Review DAO proposals and participate in governance votes.',
      url: '/contracts/dao_voting',
      icon: HowToVoteIcon,
    },
    {
      title: 'RWX smart contracts',
      description: 'Browse RWX contract deployments and audit contract details.',
      url: '/contracts/rwx_contract',
      icon: ReceiptLongIcon,
    },
    {
      title: 'Multistaking stats',
      description: 'Monitor multistaking pools, yields and participation metrics.',
      url: '/contracts/multistaking',
      icon: HubIcon,
    },
    {
      title: 'Appchains',
      description: 'Discover upcoming appchain integrations that extend L1.',
      url: '/coming-soon',
      icon: LanIcon,
      disabled: true,
    },
    {
      title: 'Mutations',
      description: 'Stay tuned for mutation registries and upgrade tooling.',
      url: '/coming-soon',
      icon: AutoFixHighIcon,
      disabled: true,
    },
    {
      title: 'Charts',
      description: 'Visualize activity with network-wide dashboards and charts.',
      url: '/coming-soon',
      icon: InsightsIcon,
      disabled: true,
    },
  ];

  return (
    <SectionWrapper title="Network info">
      {infoCards.map((item) => (
        <InfoCard
          key={item.title}
          {...item}
          onNavigate={() =>
            logUserAction(USER_ACTIONS.VISIT_PAGE, {
              url: item.url,
              location: LOCATION.HOME_PAGE,
            })
          }
        />
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

interface InfoCardProps extends InfoCardItem {
  onNavigate: () => void;
}

const InfoCard: FC<InfoCardProps> = ({ icon: Icon, title, description, url, disabled, onNavigate }) => {
  const content = (
    <CardRoot disabled={disabled}>
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
      {disabled ? (
        <SoonBadge>soon</SoonBadge>
      ) : (
        <LaunchIcon sx={{ color: 'rgba(255, 255, 255, 0.45)' }} fontSize="small" />
      )}
    </CardRoot>
  );

  if (disabled) {
    return content;
  }

  return (
    <Link
      href={url}
      onClick={onNavigate}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {content}
    </Link>
  );
};

const CardRoot: FC<{ disabled?: boolean; children: ReactNode }> = ({ disabled, children }) => (
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
      transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, opacity 0.2s ease',
      opacity: disabled ? 0.55 : 1,
      pointerEvents: disabled ? 'none' : 'auto',
      ':hover': disabled
        ? {}
        : {
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

const SoonBadge: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      ml: { xs: 1, md: 2 },
      px: 1.5,
      py: 0.5,
      borderRadius: 999,
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: 1,
      textTransform: 'uppercase',
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      color: 'rgba(255, 255, 255, 0.7)',
    }}
  >
    {children}
  </Box>
);

