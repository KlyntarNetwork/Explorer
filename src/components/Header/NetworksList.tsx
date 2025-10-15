'use client';
import { FC, MouseEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { FaucetButton } from './FaucetButton';
import { FlexColumnBox, OutlinedButton } from '@/components/ui';
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  Popover,
  SxProps,
  Typography,
} from '@mui/material';
import { logUserAction } from '@/helpers';
import { LOCATION, USER_ACTIONS } from '@/constants';
import { COLORS } from '@/styles';
import { KLY_LINKS } from '@/config';
import CloseIcon from '@mui/icons-material/Close';

const networks = [
  {
    url: KLY_LINKS.EXPLORER_MAINNET,
    base: 'mainnet',
    label: 'Klyntar Mainnet',
    description: 'Primary network for live transactions.',
  },
  {
    url: KLY_LINKS.EXPLORER_TESTNET,
    base: 'testnet',
    label: 'Klyntar Testnet',
    description: 'Validate upgrades and stage rollouts safely.',
  },
  {
    url: KLY_LINKS.EXPLORER_DEVNET,
    base: 'devnet',
    label: 'Klyntar Devnet',
    description: 'Experiment with bleeding-edge tooling.',
  },
];

const isCurrentNetwork = (network: string) => {
  if (typeof window !== 'undefined') {
    const isTestnet = window.location.hostname.includes('testnet');
    const isDevnet = window.location.hostname.includes('devnet');
    return (
      (network === 'testnet' && isTestnet) || (network === 'devnet' && isDevnet) || network === 'mainnet' && (!isDevnet && !isTestnet)
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

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    if (isOpen) {
      handleClose();
      return;
    }

    handleOpen(event);
  };

  return (
    <Box sx={{ ...sx }}>
      <FaucetButton sx={{ mr: 1 }} />

      <OutlinedButton
        id='networks-button'
        text='Switch network'
        aria-controls={isOpen ? 'networks-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleToggle}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          minWidth: { xs: 'auto', md: '136px' },
        }}
      />

      <Popover
        id={isOpen ? 'networks-menu' : undefined}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        disableRestoreFocus
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            px: 3,
            py: 3,
            backgroundColor: '#000000',
            backgroundImage: 'none',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0px 24px 48px rgba(0, 0, 0, 0.45)',
            minWidth: 320,
            maxWidth: 360,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
          }}
          onMouseLeave={handleClose}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
              Switch network
            </Typography>
            <IconButton
              aria-label='Close network menu'
              onClick={handleClose}
              edge='end'
              size='small'
              disableRipple
              disableFocusRipple
              sx={{
                color: 'text.primary',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </Box>

          <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {networks.map(({ base, label, url, description }) => {
              const active = isCurrentNetwork(base);

              return (
                <ListItemButton
                  key={base}
                  component='a'
                  href={url}
                  onClick={() => {
                    logUserAction(USER_ACTIONS.SWITCH_NETWORK, { location: LOCATION.HEADER, value: base });
                    handleClose();
                  }}
                  sx={{
                    alignItems: 'center',
                    gap: 1.5,
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    minHeight: 'auto',
                    color: 'text.primary',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                    backgroundColor: 'transparent',
                    cursor: active ? 'default' : 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: active ? COLORS.GREEN : 'rgba(255, 255, 255, 0.32)',
                        boxShadow: active ? '0 0 0 4px rgba(76, 255, 153, 0.12)' : 'none',
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                      {label}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {description}
                    </Typography>
                  </Box>
                  {active && (
                    <Box
                      component='span'
                      sx={{
                        ml: 'auto',
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: 0.2,
                        backgroundColor: 'rgba(76, 255, 153, 0.16)',
                        color: COLORS.GREEN,
                      }}
                    >
                      Active
                    </Box>
                  )}
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Popover>
    </Box>
  );
};

export const MobileNetworksList = () => {
  return (
    <FlexColumnBox sx={{ width: '100%', gap: 0 }}>
      <FlexColumnBox sx={{ width: '100%', gap: 0 }}>
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
