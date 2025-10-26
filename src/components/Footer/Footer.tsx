'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import GitHubIcon from '@public/icons/social/GitHub.svg';
import TwitterIcon from '@public/icons/social/Twitter.svg';
import TelegramIcon from '@public/icons/social/Telegram.svg';
import MediumIcon from '@public/icons/social/Medium.svg';
import DiscordIcon from '@public/icons/social/Discord.svg';
import RedditIcon from '@public/icons/social/Reddit.svg';
import FacebookIcon from '@public/icons/social/Facebook.svg';
import { LOCATION, USER_ACTIONS } from '@/constants';
import { logUserAction } from '@/helpers';
import { KLY_LINKS } from '@/config';

const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: 'FAQ',
    links: [
      {
        label: 'Validation',
        href: KLY_LINKS.HOW_TO_RUN_A_VALIDATOR,
        action: USER_ACTIONS.VISIT_DOCUMENTATION,
      },
      {
        label: 'Multistaking',
        href: KLY_LINKS.MULTISTAKING,
        action: USER_ACTIONS.VISIT_DOCUMENTATION,
      },
      {
        label: 'Privacy policy',
        href: KLY_LINKS.PRIVACY_POLICY,
        action: USER_ACTIONS.VISIT_DOCUMENTATION,
      },
    ],
  },
  {
    title: 'Sites',
    links: [
      {
        label: 'Site',
        href: KLY_LINKS.WEBSITE,
        action: USER_ACTIONS.VISIT_PAGE,
      },
      {
        label: 'Docs',
        href: KLY_LINKS.DOCS,
        action: USER_ACTIONS.VISIT_DOCUMENTATION,
      },
      {
        label: 'Portal',
        href: KLY_LINKS.PORTAL,
        action: USER_ACTIONS.VISIT_DOCUMENTATION,
      },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      {
        label: 'Tokens',
        href: KLY_LINKS.TOKENS,
        action: USER_ACTIONS.VISIT_DOCUMENTATION,
      },
      {
        label: 'Projects',
        href: '#',
        action: USER_ACTIONS.VISIT_PAGE,
      },
      {
        label: 'Appchains',
        href: '#',
        action: USER_ACTIONS.VISIT_PAGE,
      },
    ],
  },
];

const FOOTER_SOCIAL_BUTTONS: FooterSocialButtonProps[] = [
  { title: 'GitHub', href: KLY_LINKS.GITHUB, Icon: GitHubIcon },
  { title: 'Twitter', href: KLY_LINKS.TWITTER, Icon: TwitterIcon },
  { title: 'Telegram', href: KLY_LINKS.TELEGRAM, Icon: TelegramIcon },
  { title: 'Medium', href: KLY_LINKS.MEDIUM, Icon: MediumIcon },
  { title: 'Discord', href: KLY_LINKS.DISCORD, Icon: DiscordIcon },
  { title: 'Reddit', href: KLY_LINKS.REDDIT, Icon: RedditIcon },
  { title: 'Facebook', href: KLY_LINKS.FACEBOOK, Icon: FacebookIcon },
];

const BRANDED_RESOURCE: FooterResourcePillProps = {
  href: KLY_LINKS.BRAND_KIT,
  label: 'Branding',
  Icon: ArrowOutwardIcon,
};

export const Footer = () => {
  const pathname = usePathname();
  const isMainPage = pathname === '/';
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        pt: isMainPage ? '8rem' : '5rem',
      }}
    >
      <Container
        maxWidth='xl'
        sx={{
          py: { xs: '4rem', md: '5rem' },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gap: { xs: '4rem', lg: '6rem' },
            gridTemplateColumns: { lg: 'minmax(0,1.05fr) minmax(0,1fr)' },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <Typography
                component='span'
                sx={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.55em',
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                Klyntar Network
              </Typography>
              <Typography
                component='h2'
                sx={{
                  maxWidth: '45rem',
                  fontSize: { xs: '2rem', sm: '2.125rem' },
                  fontWeight: 300,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  lineHeight: 1.2,
                }}
              >
                Infrastructure for decentralized future
              </Typography>
              <Typography
                component='p'
                sx={{
                  maxWidth: '36rem',
                  fontSize: { xs: '0.9375rem', sm: '1rem' },
                  lineHeight: { xs: '1.8', sm: '1.75' },
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                We build the foundation for programmable, accountable collaboration between validators, builders, and
                institutions. Every surface is engineered for clarity, speed, and trust.
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gap: '1.5rem',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.35em',
                color: 'rgba(255,255,255,0.55)',
                gridTemplateColumns: { sm: 'repeat(2, minmax(0,1fr))' },
              }}
            >
              <FooterContactLink
                label='hello@klyntar.org'
                href='mailto:hello@klyntar.org'
                action={USER_ACTIONS.VISIT_PAGE}
              />
              <FooterContactLink
                label='Branding'
                href={KLY_LINKS.BRAND_KIT}
                action={USER_ACTIONS.VISIT_THIRD_PARTY_SOURCE}
              />
            </Box>
          </Box>

          <Box
            component='nav'
            sx={{
              display: 'grid',
              gap: '2.5rem',
              gridTemplateColumns: { sm: 'repeat(2, minmax(0,1fr))' },
            }}
          >
            {FOOTER_LINK_GROUPS.map((group) => (
              <Box key={group.title} sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Typography
                  component='p'
                  sx={{
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.45em',
                  }}
                >
                  {group.title}
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gap: '0.75rem',
                    gridTemplateColumns: { sm: 'repeat(2, minmax(0,1fr))' },
                    columnGap: { sm: '2.5rem' },
                  }}
                >
                  {group.links.map((link, index) => (
                    <Box
                      key={link.label}
                      sx={{ gridColumn: { sm: index === group.links.length - 1 ? 'span 2' : 'auto' } }}
                    >
                      <FooterNavigationLink {...link} />
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            mt: '4rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            pt: '2.5rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '2rem',
              alignItems: { md: 'center' },
              justifyContent: { md: 'space-between' },
            }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              {FOOTER_SOCIAL_BUTTONS.map((btn) => (
                <FooterSocialButton key={btn.href} {...btn} />
              ))}
              <FooterResourcePill {...BRANDED_RESOURCE} />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: '0.75rem', sm: '1.5rem' },
                fontSize: '0.75rem',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              <Typography component='span'>© {currentYear} Klyntar Network</Typography>
              <Typography component='span'>Built for humanity</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

type FooterLinkGroup = {
  title: string;
  links: FooterLinkItemProps[];
};

type FooterLinkItemProps = {
  label: string;
  href: string;
  action: USER_ACTIONS;
};

type FooterSocialButtonProps = {
  title: string;
  href: string;
  Icon?: FC<any>;
};

type FooterResourcePillProps = {
  href: string;
  label: string;
  Icon?: FC<any>;
};

const FooterNavigationLink: FC<FooterLinkItemProps> = ({ label, href, action }) => (
  <Box
    component={Link}
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    prefetch={false}
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '1rem',
      textDecoration: 'none',
      color: 'rgba(255,255,255,0.7)',
      letterSpacing: '0.1em',
      fontSize: '0.875rem',
      transition: 'color 0.3s ease',
      '&:hover': {
        color: '#fff',
      },
      '& span:first-of-type': {
        display: 'block',
        height: '1px',
        width: '1.5rem',
        backgroundColor: 'rgba(255,255,255,0.25)',
        transition: 'width 0.3s ease, background-color 0.3s ease',
      },
      '&:hover span:first-of-type': {
        width: '3rem',
        backgroundColor: '#fff',
      },
    }}
    onClick={() =>
      logUserAction(action, {
        location: LOCATION.FOOTER,
        ...getActionDetails(action, label, href),
      })
    }
  >
    <Box component='span' />
    <Typography component='span'>{label}</Typography>
  </Box>
);

const FooterSocialButton: FC<FooterSocialButtonProps> = ({ title, href, Icon }) => (
  <Box
    component={Link}
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    prefetch={false}
    aria-label={title}
    sx={{
      width: '3rem',
      height: '3rem',
      borderRadius: '999px',
      border: '1px solid rgba(255,255,255,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
      transition: 'border-color 0.3s ease, background-color 0.3s ease',
      color: '#fff',
      '&:hover': {
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.1)',
      },
      lineHeight: 0,
      '& svg': {
        display: 'block',
        width: '1.25rem',
        height: '1.25rem',
      },
    }}
    onClick={() =>
      logUserAction(USER_ACTIONS.VISIT_SOCIAL_MEDIA, {
        location: LOCATION.FOOTER,
        provider: title,
      })
    }
  >
    {Icon && <Icon aria-hidden='true' />}
  </Box>
);

const FooterResourcePill: FC<FooterResourcePillProps> = ({ href, label, Icon }) => {
  const isExternal = href.startsWith('http');

  return (
    <Box
      component={Link}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      prefetch={false}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        borderRadius: '999px',
        border: '1px solid rgba(255,255,255,0.15)',
        padding: '0.5rem 1.25rem',
        textDecoration: 'none',
        fontSize: '0.6875rem',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: '#fff',
        backgroundColor: 'transparent',
        transition: 'border-color 0.3s ease, background-color 0.3s ease',
        '&:hover': {
          borderColor: '#fff',
          backgroundColor: 'rgba(255,255,255,0.1)',
        },
        lineHeight: 0,
        '& svg': {
          display: 'block',
          width: '1rem',
          height: '1rem',
        },
      }}
      onClick={() =>
        logUserAction(USER_ACTIONS.VISIT_PAGE, {
          location: LOCATION.FOOTER,
          url: href,
        })
      }
    >
      {Icon && <Icon aria-hidden='true' style={{ width: '1rem', height: '1rem' }} />}
      <Typography component='span'>{label}</Typography>
    </Box>
  );
};

const FooterContactLink: FC<FooterLinkItemProps> = ({ label, href, action }) => (
  <Box
    component={Link}
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    prefetch={false}
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '1rem',
      borderRadius: '999px',
      border: '1px solid rgba(255,255,255,0.12)',
      padding: '0.75rem 1.25rem',
      textDecoration: 'none',
      letterSpacing: '0.35em',
      color: '#fff',
      transition: 'border-color 0.3s ease, background-color 0.3s ease',
      '&:hover': {
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.1)',
      },
      '& span:first-of-type': {
        display: 'block',
        width: '2rem',
        height: '1px',
        backgroundColor: 'rgba(255,255,255,0.25)',
      },
    }}
    onClick={() =>
      logUserAction(action, {
        location: LOCATION.FOOTER,
        ...getActionDetails(action, label, href),
      })
    }
  >
    <Box component='span' />
    <Typography component='span'>{label}</Typography>
  </Box>
);

const getActionDetails = (userAction: USER_ACTIONS, label: string, href: string) => {
  switch (userAction) {
    case USER_ACTIONS.VISIT_SOCIAL_MEDIA:
      return { provider: label };
    case USER_ACTIONS.VISIT_PAGE:
    case USER_ACTIONS.VISIT_THIRD_PARTY_SOURCE:
    case USER_ACTIONS.VISIT_EXPLORER:
    case USER_ACTIONS.VISIT_DOCUMENTATION:
      return { url: href };
    default:
      return {};
  }
};
