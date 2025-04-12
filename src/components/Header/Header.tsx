'use client';
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { MobileNetworksList, DesktopNetworksList } from './NetworksList';
import { SocialButtons } from './SocialButtons';
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { OutlinedButton, PageContainer } from '@/components/ui';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import KlyntarFoundationLogo from '@public/icons/company/KlyntarFoundationLogo.svg';
import MenuIcon from '@public/icons/ui/menu.svg';
import Close from '@public/icons/ui/close.svg';

const mobileHeaderElements = [
  {
    id: 'networks',
    label: 'Explore networks',
    element: MobileNetworksList,
  },
  {
    id: 'socials_and_other',
    label: 'Social media & other',
    element: SocialButtons,
  },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openedElement, setOpenedElement] = useState<string | null>(null);

  useEffect(() => {
    const resizeHandler = () => setIsOpen(false);
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <PageContainer
      sx={{ pt: 2.5, pb: 3.5 }}
    >
      <Box
        sx={{
          gap: { xs: 2, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href='/'>
          <KlyntarFoundationLogo />
        </Link>
        {isOpen ? (
          <OutlinedButton
            icon={<Close />}
            onClick={() => setIsOpen(false)}
            sx={{ display: { '@media (min-width: 1045px)': {
                display: 'none',
              }, } }}
          />
        ) : (
          <OutlinedButton
            icon={<MenuIcon />}
            onClick={() => setIsOpen(true)}
            sx={{ display: { '@media (min-width: 1045px)': {
                display: 'none',
              }, } }}
          />
        )}
        <Box
          sx={{
            display: {
              '@media (max-width: 1045px)': {
                display: 'none',
              },
              md: 'flex',
              gap: 30,
              alignItems: 'center'
            },
          }}
        >
          <SocialButtons />
          <DesktopNetworksList />
        </Box>
      </Box>
      <Collapse
        in={isOpen}
        timeout='auto'
        unmountOnExit
        sx={{ display: { '@media (min-width: 1045px)': {
                display: 'none',
              },} }}
      >
        <List
          sx={{ width: '100%', borderBottom: 1 }}
          component='div'
        >
          {mobileHeaderElements.map(({ id, label, element: Element }) => (
            <Fragment key={id}>
              <ListItemButton
                onClick={() =>
                  setOpenedElement(openedElement === id ? null : id)
                }
              >
                <ListItemText primary={label} />
                {openedElement === id ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={openedElement === id}
                timeout='auto'
                unmountOnExit
              >
                <ListItem component='div'>
                  <Element />
                </ListItem>
              </Collapse>
            </Fragment>
          ))}
        </List>
      </Collapse>
    </PageContainer>
  );
};
