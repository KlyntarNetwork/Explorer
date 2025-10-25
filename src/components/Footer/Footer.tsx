'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import cls from 'classnames';
import { Container } from '@/components/ui';
import { footerBtns, LOCATION, USER_ACTIONS } from '@/constants';
import { logUserAction } from '@/helpers';
import { usePathname } from 'next/navigation';
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
        label: 'Main',
        href: KLY_LINKS.WEBSITE,
        action: USER_ACTIONS.VISIT_SITE,
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
        href: KLY_LINKS.DOCS,
        action: USER_ACTIONS.VISIT_DOCUMENTATION,
      },
    ],
  },
];

const Footer = () => {
  const pathname = usePathname();
  const isMainPage = pathname === '/';
  const socials = footerBtns.filter((btn) => !btn.text);
  const brandedResource = footerBtns.find((btn) => Boolean(btn.text));
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cls('bg-black text-white', isMainPage ? 'pt-32' : 'pt-20')}>
      <Container className='py-16 md:py-20'>
        <div className='grid gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]'>
          <div className='space-y-10'>
            <div className='space-y-5'>
              <span className='text-xs uppercase tracking-[0.55em] text-white/45'>Klyntar Network</span>
              <h2 className='max-w-xl text-3xl font-light uppercase tracking-[0.3em] text-white sm:text-[34px]'>
                Infrastructure for decentralized future
              </h2>
              <p className='max-w-lg text-sm leading-6 text-white/65 sm:text-base sm:leading-7'>
                We build the foundation for programmable, accountable collaboration between validators, builders, and
                institutions. Every surface is engineered for clarity, speed, and trust.
              </p>
            </div>

            <div className='grid gap-6 text-xs uppercase tracking-[0.35em] text-white/55 sm:grid-cols-2'>
              <FooterContactLink
                label='hello@klyntar.org'
                href='mailto:hello@klyntar.org'
                action={USER_ACTIONS.VISIT_PAGE}
              />
              <FooterContactLink
                label='Brand resources'
                href={KLY_LINKS.BRAND_KIT}
                action={USER_ACTIONS.VISIT_THIRD_PARTY_SOURCE}
              />
            </div>
          </div>

          <nav className='grid gap-10 sm:grid-cols-2'>
            {FOOTER_LINK_GROUPS.map((group) => (
              <div key={group.title} className='space-y-4'>
                <p className='text-sm uppercase tracking-[0.45em] text-white'>{group.title}</p>
                <div className='grid gap-y-3 sm:grid-cols-2 sm:gap-x-10'>
                  {group.links.map((link, index) => (
                    <div key={link.label} className={cls(index === group.links.length - 1 && 'sm:col-span-2')}>
                      <FooterNavigationLink {...link} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className='mt-16 border-t border-white/10 pt-10'>
          <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
            <div className='flex flex-wrap items-center gap-3'>
              {socials.map((btn) => (
                <FooterSocialButton key={btn.link} title={btn.title ?? ''} href={btn.link} Icon={btn.icon} />
              ))}
              {brandedResource && (
                <FooterResourcePill
                  href={brandedResource.link}
                  label={brandedResource.text ?? 'Brand kit'}
                  Icon={brandedResource.icon}
                />
              )}
            </div>

            <div className='flex flex-col gap-3 text-xs uppercase tracking-[0.32em] text-white/50 sm:flex-row sm:items-center sm:gap-6'>
              <span>© {currentYear} Klyntar Network</span>
              <span>Built for humanity</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
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
  <Link
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    prefetch={false}
    className='group inline-flex items-center gap-4 text-sm tracking-[0.1em] text-white/70 transition hover:text-white'
    onClick={() =>
      logUserAction(action, {
        location: LOCATION.FOOTER,
        ...getActionDetails(action, label, href),
      })
    }
  >
    <span className='h-px w-6 bg-white/25 transition-all group-hover:w-12 group-hover:bg-white' />
    <span>{label}</span>
  </Link>
);

const FooterSocialButton: FC<FooterSocialButtonProps> = ({ title, href, Icon }) => (
  <Link
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    prefetch={false}
    aria-label={title}
    className='group flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/60 transition hover:border-white hover:bg-white/10'
    onClick={() =>
      logUserAction(USER_ACTIONS.VISIT_SOCIAL_MEDIA, {
        location: LOCATION.FOOTER,
        provider: title,
      })
    }
  >
    {Icon && <Icon aria-hidden='true' />}
  </Link>
);

const FooterResourcePill: FC<FooterResourcePillProps> = ({ href, label, Icon }) => {
  const isExternal = href.startsWith('http');

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      prefetch={false}
      className='group inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-2 text-[11px] uppercase tracking-[0.35em] text-white transition hover:border-white hover:bg-white/10'
      onClick={() =>
        logUserAction(USER_ACTIONS.VISIT_PAGE, {
          location: LOCATION.FOOTER,
          url: href,
        })
      }
    >
      {Icon && <Icon aria-hidden='true' />}
      <span>{label}</span>
    </Link>
  );
};

const FooterContactLink: FC<FooterLinkItemProps> = ({ label, href, action }) => (
  <Link
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    prefetch={false}
    className='inline-flex items-center gap-4 rounded-full border border-white/12 px-5 py-3 text-[11px] tracking-[0.35em] text-white transition hover:border-white hover:bg-white/10'
    onClick={() =>
      logUserAction(action, {
        location: LOCATION.FOOTER,
        ...getActionDetails(action, label, href),
      })
    }
  >
    <span className='h-px w-8 bg-white/25' />
    <span>{label}</span>
  </Link>
);

const getActionDetails = (userAction: USER_ACTIONS, label: string, href: string) => {
  switch (userAction) {
    case USER_ACTIONS.VISIT_SOCIAL_MEDIA:
      return { provider: label };
    case USER_ACTIONS.VISIT_PAGE:
    case USER_ACTIONS.VISIT_THIRD_PARTY_SOURCE:
      return { url: href };
    default:
      return {};
  }
};

export default Footer;