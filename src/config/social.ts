import GitHub from '@public/icons/social/GitHub.svg';
import Reddit from '@public/icons/social/Reddit.svg';
import Twitter from '@public/icons/social/Twitter.svg';
import Telegram from '@public/icons/social/Telegram.svg';
import Medium from '@public/icons/social/Medium.svg';
import Discord from '@public/icons/social/Discord.svg';
import Facebook from '@public/icons/social/Facebook.svg';

export enum KLY_LINKS {
  EXPLORER_TESTNET = 'https://testnet.klyntarscan.org',
  EXPLORER_MAINNET = 'https://klyntarscan.org',
  WEBSITE = 'https://klyntar.org',
  TESTNET_FAUCET = 'https://klyntar.org/testnet-faucet',
  GITHUB = 'https://github.com/KlyntarNetwork',
  TWITTER = 'https://twitter.com/KlyntarNetwork',
  TELEGRAM = 'https://t.me/KlyntarNetwork',
  MEDIUM = 'https://klyntar.medium.com',
  DISCORD = 'https://discord.com/invite/f7e7fCp97r',
  REDDIT = 'https://www.reddit.com/r/KlyntarNetwork',
  FACEBOOK = 'https://www.facebook.com/KlyntarNetwork/',
  DOCS = 'https://docs.klyntar.org',
  HOW_TO_RUN_A_VALIDATOR = 'https://docs.klyntar.org/build-core-and-join-network/become-kly-validator',
  MULTISTAKING = 'https://docs.klyntar.org/project-litepaper-and-main-features/multistaking-nextgen-liquid-restaking',
  STAKING = 'https://docs.klyntar.org/build-core-and-join-network/staking/default-staking/staking',
  RWX_CONTRACTS = 'https://docs.klyntar.org/rwx-contracts/create-rwx-contract-and-deploy-with-web1337',
  CMC = 'https://coinmarketcap.com/',
  TOKENS = '#'
}

export const socialIconsWithLinks: Array<{
  icon: any;
  url: string;
}> = [
  { icon: GitHub, url: KLY_LINKS.GITHUB },
  { icon: Twitter, url: KLY_LINKS.TWITTER },
  { icon: Telegram, url: KLY_LINKS.TELEGRAM },
  { icon: Medium, url: KLY_LINKS.MEDIUM },
  { icon: Discord, url: KLY_LINKS.DISCORD },
  { icon: Reddit, url: KLY_LINKS.REDDIT },
  { icon: Facebook, url: KLY_LINKS.FACEBOOK },
];
