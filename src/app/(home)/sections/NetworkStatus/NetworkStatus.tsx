'use client';
import { ElementType, FC } from 'react';
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
import { GreenGradientBackground } from '@/components/ui';
import { BlockchainData } from '@/definitions';
import { logUserAction } from '@/helpers';
import { LOCATION, USER_ACTIONS } from '@/constants';

interface Props {
  data: BlockchainData
}

type InfoCardItem = {
  title: string;
  description: string;
  url: string;
  disabled?: boolean;
  icon: ElementType;
};

export const NetworkStatus:FC<Props> = ({ data }) => {
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
    <GreenGradientBackground
      sx={{
        p: { xs: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography variant='h1'>
        Network Info
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
        {infoCards.map((item) => (
          <InfoCard
            key={item.title}
            {...item}
            onClick={() =>
              !item.disabled &&
              logUserAction(USER_ACTIONS.VISIT_PAGE, {
                url: item.url,
                location: LOCATION.HOME_PAGE,
              })
            }
          />
        ))}
      </Box>
    </GreenGradientBackground>
  );
};

interface InfoCardProps extends InfoCardItem {
  onClick: () => void;
}

const InfoCard: FC<InfoCardProps> = ({ icon: Icon, title, description, url, disabled, onClick }) => {
  const content = (
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
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        ':hover': disabled
          ? {}
          : {
              transform: 'translateY(-2px)',
              background: 'rgba(18, 18, 18, 0.9)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
            },
      }}
      onClick={disabled ? undefined : onClick}
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
          color: 'secondary.main',
          flexShrink: 0,
        }}
      >
        <Icon fontSize='small' />
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </Box>
      {!disabled && (
        <LaunchIcon sx={{ mt: 0.5, color: 'text.secondary' }} fontSize='small' />
      )}
    </Box>
  );

  if (disabled) {
    return content;
  }

  return (
    <Link href={url} style={{ textDecoration: 'none' }}>
      {content}
    </Link>
  );
};