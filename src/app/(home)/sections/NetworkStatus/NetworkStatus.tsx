'use client';
import { FC } from 'react';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { GreenGradientBackground } from '@/components/ui';
import { BlockchainData } from '@/definitions';
import { logUserAction } from '@/helpers';
import { LOCATION, USER_ACTIONS } from '@/constants';
import LaunchIcon from '@mui/icons-material/Launch';

interface Props {
  data: BlockchainData
}

export const NetworkStatus:FC<Props> = ({ data }) => {
  const linksToPages: Record<string, string> = {
    'Blocks data and stats': '/blocks',
    'Epochs data': '/epochs/' + data.epochId,
    'Hostchains checkpoints': '/checkpoints',
    'Voting & DAO': '/contracts/dao_voting',
    'RWX smart contracts': '/contracts/rwx_contract',
    'Multistaking stats': '/contracts/multistaking',
    'Appchains': '/coming-soon',
    'Mutations': '/coming-soon',
    'Charts': '/coming-soon'
  }

  return (
    <GreenGradientBackground sx={{ p: 3 }}>
      <Typography variant='h1' sx={{ mb: 2 }}>
        Network Info
      </Typography>
      {Object.keys(linksToPages).map(title => (
        <ContentLink
          title={title}
          url={linksToPages[title]}
          key={title}
          disabled={linksToPages[title] === '#'}
        />
      ))}
    </GreenGradientBackground>
  );
}

const ContentLink: FC<{ title: string, url: string, disabled?: boolean }> = ({
  title,
  url,
  disabled
}) => {
  return (
    <Typography
      color={disabled ? 'text.secondary' : 'text.primary'}
      sx={{

        textDecoration: 'none',
        lineHeight: '33px',
        display: 'block',
        transition: 'text-decoration-thickness 0.2s ease, text-underline-offset 0.2s ease',
        '&:hover': {
          textDecoration: 'underline',
          textDecorationThickness: '3px',
          textUnderlineOffset: '10px',
        },

        textUnderlineOffset: '5px',
        textDecorationThickness: '1px',
        textDecorationColor: disabled ? '#ffffff' : 'auto',
        fontSize: '18px',
        my: 1.25
      }}
      onClick={() => logUserAction(USER_ACTIONS.VISIT_PAGE, { url, location: LOCATION.HOME_PAGE })}
    >
      <LaunchIcon sx={{ position: 'relative', bottom: '-4px', height: '20px', mr: '5px' }} />
      <Link
        href={url}
        passHref
        style={{
          color: 'inherit',
          textDecoration:'none',
          cursor: disabled ? 'default' : 'pointer'
        }}
        aria-disabled={disabled}
      >
        {title}
      </Link>
    </Typography>
  );
}