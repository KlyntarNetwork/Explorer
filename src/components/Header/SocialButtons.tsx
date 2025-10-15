import {
  Box,
  IconButton,
  List,
  ListItemButton,
  Popover,
  Typography,
} from '@mui/material';
import type { PopoverOrigin } from '@mui/material/Popover';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { socialIconsWithLinks, KLY_LINKS } from '@/config';
import { OutlinedButton } from '@/components/ui';
import React, { useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import NextLink from 'next/link';
import CloseIcon from '@mui/icons-material/Close';

type DropdownItem = {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  external?: boolean;
};

type DropdownSection = {
  title: string;
  items: DropdownItem[];
};

const dropdownSections: DropdownSection[] = [
  {
    title: 'Staking',
    items: [
      {
        title: 'Validator hub',
        description: 'Browse and delegate to top KLY validators.',
        href: KLY_LINKS.HOW_TO_RUN_A_VALIDATOR,
        icon: ShieldOutlinedIcon,
        external: true,
      },
      {
        title: 'One-click staking',
        description: 'Get started with guided staking flows in minutes.',
        href: KLY_LINKS.STAKING,
        icon: BoltOutlinedIcon,
        external: true,
      },
      {
        title: 'Rewards monitor',
        description: 'Track yield and compounding in real time.',
        href: KLY_LINKS.MULTISTAKING,
        icon: TrendingUpOutlinedIcon,
        external: true,
      },
    ],
  },
  {
    title: 'Explore',
    items: [
      {
        title: 'Mainnet explorer',
        description: 'Follow transactions and accounts on the main network.',
        href: KLY_LINKS.EXPLORER_MAINNET,
        icon: PublicOutlinedIcon,
        external: true,
      },
      {
        title: 'Testnet explorer',
        description: 'Inspect activity across the latest test environments.',
        href: KLY_LINKS.EXPLORER_TESTNET,
        icon: TravelExploreOutlinedIcon,
        external: true,
      },
      {
        title: 'Devnet explorer',
        description: 'Build and debug against bleeding-edge releases.',
        href: KLY_LINKS.EXPLORER_DEVNET,
        icon: HubOutlinedIcon,
        external: true,
      },
    ],
  },
  {
    title: 'Developers',
    items: [
      {
        title: 'Documentation',
        description: 'Guides, references and concepts for building on KLY.',
        href: KLY_LINKS.DOCS,
        icon: MenuBookOutlinedIcon,
        external: true,
      },
      {
        title: 'RWX contracts',
        description: 'Compose and deploy RWX contracts with Web1337.',
        href: KLY_LINKS.RWX_CONTRACTS,
        icon: IntegrationInstructionsOutlinedIcon,
        external: true,
      },
      {
        title: 'GitHub org',
        description: 'Browse the latest repositories, tooling and releases.',
        href: KLY_LINKS.GITHUB,
        icon: CodeOutlinedIcon,
        external: true,
      },
    ],
  },
];

export const SocialButtons = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (open) {
      handleClose();
      return;
    }

    handleOpen(event);
  };

  const popoverOrigins = useMemo<{ anchor: PopoverOrigin; transform: PopoverOrigin }>(
    () => ({
      anchor: isDesktop
        ? { vertical: 'bottom', horizontal: 'center' }
        : { vertical: 'bottom', horizontal: 'right' },
      transform: isDesktop
        ? { vertical: 'top', horizontal: 'center' }
        : { vertical: 'top', horizontal: 'right' },
    }),
    [isDesktop],
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        mr: 1,
      }}
    >
      <OutlinedButton
        key={"more_button"}
        text="More"
        sx={{
          minWidth: { xs: 'auto', md: '104px' },
        }}
        id='header-more-button'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        aria-controls={open ? 'header-more-menu' : undefined}
        onClick={handleToggle}
        onMouseEnter={isDesktop ? handleOpen : undefined}
      />
      <Popover
        id={open ? 'header-more-menu' : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableRestoreFocus
        anchorOrigin={popoverOrigins.anchor}
        transformOrigin={popoverOrigins.transform}
        PaperProps={{
          sx: {
            mt: { xs: 0, md: 1.5 },
            px: { xs: 2, md: 4 },
            py: { xs: 2, md: 4 },
            backgroundColor: '#000000',
            backgroundImage: 'none',
            borderRadius: { xs: 0, md: 3 },
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0px 24px 48px rgba(0, 0, 0, 0.45)',
            width: '100vw',
            maxWidth: '100vw',
            left: '0 !important',
            right: '0 !important',
            maxHeight: { xs: '100vh', md: 'unset' },
            overflow: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxHeight: { xs: 'calc(100vh - 96px)', md: 'none' },
            overflowY: { xs: 'auto', md: 'visible' },
            pr: { xs: 1, md: 0 },
          }}
        >
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
              position: 'sticky',
              top: 0,
              py: 0.5,
              px: 0.5,
              backgroundColor: 'transparent',
              zIndex: 1,
            }}
          >
            <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
              More
            </Typography>
            <IconButton
              aria-label='Close menu'
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
          <Box
            component='nav'
            aria-label='More navigation'
            onMouseLeave={isDesktop ? handleClose : undefined}
            sx={{
              display: 'grid',
              gap: { xs: 3, md: 4 },
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
              },
              width: '100%',
              pb: { xs: 2, md: 0 },
            }}
          >
          {dropdownSections.map((section) => (
            <Box key={section.title} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography
                variant='caption'
                sx={{
                  letterSpacing: '0.08em',
                  color: 'text.secondary',
                }}
              >
                {section.title}
              </Typography>
              <List
                disablePadding
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                }}
              >
                {section.items.map(({ title, description, href, icon: Icon, external }) => (
                  <ListItemButton
                    key={title}
                    component={NextLink}
                    href={href}
                    onClick={handleClose}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    sx={{
                      alignItems: 'flex-start',
                      gap: 1.5,
                      px: 1.5,
                      py: 1.5,
                      borderRadius: 2,
                      minHeight: 'auto',
                      color: 'text.primary',
                      transition: 'background-color 0.2s ease, color 0.2s ease',
                      backgroundColor: 'transparent',
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
                      <Icon fontSize='small' />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                        {title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {description}
                      </Typography>
                    </Box>
                  </ListItemButton>
                ))}
              </List>
            </Box>
          ))}
          </Box>
        </Box>
      </Popover>
      {socialIconsWithLinks.map(({ icon: Icon, url }) => (
        <OutlinedButton key={url} icon={<Icon />} url={url} />
      ))}
    </Box>
  );
};
