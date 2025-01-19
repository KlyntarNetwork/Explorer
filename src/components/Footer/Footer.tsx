import { FC } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { FlexCenterBox, PageContainer } from '@/components/ui';
import { COLORS } from '@/styles';
import { KLY_LINKS } from '@/config';

export const Footer = () => {
  return (
    <PageContainer sx={{ pb: 5, pt: 20}} >
      <Grid container spacing={{ lg: 2, xs: 5 }}>
        <Grid item xs={12} lg={5.4} >
          <Box>
            <FlexCenterBox sx={{
              gap: 0.5,
              justifyContent: 'flex-start'
            }}>
              <Typography variant='h2'>Built with 🤍</Typography>
            </FlexCenterBox>
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              We stand for decentralization, open-source development and community interests.
            </Typography>
            <Typography sx={{ mt: 4.5 }}>
              Contact us: <Link href='mailto:hello@klyntar.org' style={{
                color: COLORS.SILVER
              }}>hello@klyntar.org</Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.2}>
          <Box sx={{ pl: {xl:15,sm:10} }}>
            <Typography variant='h2' sx={{ mb: 2 }}>FAQ</Typography>
            <FooterLink title="Run a validator" url={KLY_LINKS.HOW_TO_RUN_A_VALIDATOR} />
            <FooterLink title="Staking" url={KLY_LINKS.STAKING} />
            <FooterLink title="Multistaking" url={KLY_LINKS.MULTISTAKING} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.2}>
          <Box sx={{ pl: {xl:15,sm:10} }}>
            <Typography variant='h2' sx={{ mb: 2 }}>Sites</Typography>
            <FooterLink title="Site" url={KLY_LINKS.WEBSITE} />
            <FooterLink title="GitHub" url={KLY_LINKS.GITHUB} />
            <FooterLink title="CoinMarketCap" url={KLY_LINKS.CMC} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.2}>
          <Box sx={{ pl: {xl:15,sm:10} }}>
            <Typography variant='h2' sx={{ mb: 2}}>Ecosystem</Typography>
            <FooterLink title="Tokens" url={KLY_LINKS.TOKENS} />
            <FooterLink title="RWX contracts" url={KLY_LINKS.RWX_CONTRACTS} />
            <FooterLink title="Faucet" url={KLY_LINKS.TESTNET_FAUCET} />
          </Box>
        </Grid>
      </Grid>
      </PageContainer>
  );
}

const FooterLink: FC<{
  title: string,
  url: string
}> = ({ title, url }) => {
  return (
    <Typography
      color='text.primary'
      sx={{
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        textDecorationThickness: '1px',
        lineHeight: '33px',
        display: 'block',
      }}
    >
      <Link
        href={url}
        passHref
        style={{
          color: 'inherit',
          textDecorationThickness: 'inherit'
        }}
      >
        {title}
      </Link>
    </Typography>
  );
}