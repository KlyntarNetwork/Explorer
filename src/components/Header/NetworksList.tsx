'use client';
import { FC, MouseEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { FaucetButton } from './FaucetButton';
import { FlexColumnBox, Indicator } from '@/components/ui';
import { Box, Button, Menu, MenuItem, SxProps, Typography } from '@mui/material';
import { logUserAction } from '@/helpers';
import { LOCATION, USER_ACTIONS } from '@/constants';
import { BG_COLORS, COLORS } from '@/styles';
import { KLY_LINKS } from '@/config';

const networks = [
  {
    url: KLY_LINKS.EXPLORER_MAINNET,
    base: 'mainnet',
    label: 'Klyntar Mainnet',
  },
  {
    url: KLY_LINKS.EXPLORER_TESTNET,
    base: 'testnet',
    label: 'Klyntar Testnet',
  },
  {
    url: KLY_LINKS.EXPLORER_DEVNET,
    base: 'devnet',
    label: 'Klyntar Devnet',
  },
];

const isCurrentNetwork = (network: string) => {
  if (typeof window !== 'undefined') {
    const isTestnet = window.location.hostname.includes('testnet');
    return (
      (network === 'testnet' && isTestnet) ||
      (network === 'mainnet' && !isTestnet)
    );
  }

  return false;
};

export const DesktopNetworksList: FC<{ sx?: SxProps }> = ({ sx }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  useEffect(() => {
    const resizeHandler = () => setAnchorEl(null);
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ ...sx }}>
      <FaucetButton sx={{ mr: 1 }} />

      <Button
        id='networks-button'
        aria-controls={isOpen ? 'networks-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleOpen}
        sx={{
          background: isOpen ? BG_COLORS.DARK_GRAY_HOVER : BG_COLORS.DARK_GRAY,
          ':hover': { background: BG_COLORS.DARK_GRAY_HOVER },
          py: 1.5,
          px: 2
        }}
      >
        <Indicator />
        Switch network
      </Button>

      <Menu
        id='networks-menu'
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'networks-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {networks.map(({ base, label, url }) => (
          <MenuItem
            key={base}
            component='a'
            href={url}
            onClick={handleClose}
            sx={{
              borderRadius: '0px !important',
              px: 2,
              py: 1,
              cursor: isCurrentNetwork(base) ? 'default' : 'pointer'
            }}
          >
            <Indicator
              color={isCurrentNetwork(base) ? COLORS.GREEN : 'transparent'}
            />
            <Typography
              color={isCurrentNetwork(base) ? 'primary' : 'text.primary'}
              variant='caption'
              sx={{ fontWeight: 'bold', fontSize: '14px' }}
              onClick={() => logUserAction(USER_ACTIONS.SWITCH_NETWORK, { location: LOCATION.HEADER, value: base })}
            >
              {label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export const MobileNetworksList = () => {
  return (
    <FlexColumnBox sx={{ width: '100%', gap: 1 }}>
      <FlexColumnBox sx={{ width: '100%', gap: 0.5 }}>
        {networks.map(({ label, base, url }) => (
          <Typography
            key={url}
            color={isCurrentNetwork(base) ? 'primary' : 'text.primary'}
            variant='caption'
            sx={{
              fontWeight: 'bold',
              fontSize: '14px',
              lineHeight: 2.5,
              ml: 2
            }}
            onClick={() => logUserAction(USER_ACTIONS.SWITCH_NETWORK, { location: LOCATION.MOBILE_MENU, value: base })}
          >
            <Link
              href={url}
              style={{
                color: 'inherit',
                textDecoration: 'inherit',
                textDecorationThickness: 'inherit',
                cursor: isCurrentNetwork(base) ? 'default' : 'pointer',
              }}
            >
              {label}
            </Link>
          </Typography>
        ))}
      </FlexColumnBox>
      <FaucetButton sx={{ pl: 2 }} variant='text' />
    </FlexColumnBox>
  );
};
