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
      <CardsGrid>
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

interface InfoCardProps extends InfoCardItem {
  onNavigate: () => void;
}

const InfoCard: FC<InfoCardProps> = ({ icon: Icon, title, description, url, disabled, onNavigate }) => {
  const content = (
    <CardRoot disabled={disabled}>
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
          {disabled ? (
            <SoonBadge>soon</SoonBadge>
          ) : (
            <LaunchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} fontSize="small" />
          )}
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

  if (disabled) {
    return content;
  }

  return (
    <Link
      href={url}
      onClick={onNavigate}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
    >
      {content}
    </Link>
  );
};

const CardRoot: FC<{ disabled?: boolean; children: ReactNode }> = ({ disabled, children }) => (
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
      transition: 'border-color 0.2s ease, transform 0.2s ease, background-color 0.2s ease, opacity 0.2s ease',
      opacity: disabled ? 0.58 : 1,
      pointerEvents: disabled ? 'none' : 'auto',
      ':hover': disabled
        ? {}
        : {
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

const SoonBadge: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      flexShrink: 0,
      px: 1,
      py: 0.35,
      borderRadius: 10,
      fontSize: '0.7rem',
      fontWeight: 600,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      backgroundColor: 'rgba(255, 255, 255, 0.14)',
      color: 'rgba(255, 255, 255, 0.75)',
    }}
  >
    {children}
  </Box>
);

