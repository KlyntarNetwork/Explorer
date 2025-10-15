'use client';
import { FC } from 'react';
import { Box, List, ListItemButton, Typography } from '@mui/material';
import Link from 'next/link';
import { GreenGradientBackground } from '@/components/ui';
import { BlockchainData } from '@/definitions';
import { logUserAction } from '@/helpers';
import { LOCATION, USER_ACTIONS } from '@/constants';
import LaunchIcon from '@mui/icons-material/Launch';

interface Props {
  data: BlockchainData
}

type LinkItem = {
  title: string,
  url: string,
  description: string,
  status?: 'coming_soon',
};

const links = (epochId: string): LinkItem[] => ([
  {
    title: 'Blocks data and stats',
    url: '/blocks',
    description: 'Latest block production and throughput numbers.',
  },
  {
    title: 'Epochs data',
    url: `/epochs/${epochId}`,
    description: 'Deep dive into the current and historical epochs.',
  },
  {
    title: 'Hostchains checkpoints',
    url: '/checkpoints',
    description: 'Observe security checkpoints across hostchains.',
  },
  {
    title: 'Voting & DAO',
    url: '/contracts/dao_voting',
    description: 'Track proposals and governance participation.',
  },
  {
    title: 'RWX smart contracts',
    url: '/contracts/rwx_contract',
    description: 'Inspect smart contracts powering RWX.',
  },
  {
    title: 'Multistaking stats',
    url: '/contracts/multistaking',
    description: 'Monitor validators and delegations in one place.',
  },
  {
    title: 'Appchains',
    url: '/coming-soon',
    description: 'Preview the catalog of app-specific chains.',
    status: 'coming_soon',
  },
  {
    title: 'Mutations',
    url: '/coming-soon',
    description: 'Stay tuned for upcoming on-chain upgrades.',
    status: 'coming_soon',
  },
  {
    title: 'Charts',
    url: '/coming-soon',
    description: 'Visualize network performance over time.',
    status: 'coming_soon',
  },
]);

export const NetworkStatus:FC<Props> = ({ data }) => {
  return (
    <GreenGradientBackground
      sx={{
        p: { xs: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography variant='h1' sx={{ fontSize: { xs: 24, md: 28 }, fontWeight: 700 }}>
        Network Info
      </Typography>
      <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {links(data.epochId).map(({ title, url, description, status }) => (
          <ContentLink
            title={title}
            url={url}
            description={description}
            status={status}
            key={title}
          />
        ))}
      </List>
    </GreenGradientBackground>
  );
}

const ContentLink: FC<{ title: string, url: string, description: string, status?: LinkItem['status'] }> = ({
  title,
  url,
  description,
  status,
}) => {
  return (
    <ListItemButton
      component={Link}
      href={url}
      onClick={() => logUserAction(USER_ACTIONS.VISIT_PAGE, { url, location: LOCATION.HOME_PAGE })}
      sx={{
        alignItems: 'flex-start',
        gap: 2,
        px: { xs: 2, md: 2.5 },
        py: { xs: 2, md: 2.5 },
        borderRadius: 3,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.35) 0%, rgba(255, 255, 255, 0.04) 100%)',
        color: 'text.primary',
        transition: 'border-color 0.2s ease, transform 0.2s ease, background-color 0.2s ease',
        textDecoration: 'none',
        minHeight: 'auto',
        '&:hover': {
          borderColor: 'rgba(255, 255, 255, 0.24)',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          transform: 'translateY(-2px)',
        },
      }}
    >
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
          mt: 0.5,
        }}
      >
        <LaunchIcon sx={{ fontSize: 18 }} />
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
          {description}
        </Typography>
      </Box>
      {status === 'coming_soon' && (
        <Box
          component='span'
          sx={{
            ml: 'auto',
            px: 1.5,
            py: 0.5,
            borderRadius: 99,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: 'text.secondary',
          }}
        >
          Soon
        </Box>
      )}
    </ListItemButton>
  );
}
