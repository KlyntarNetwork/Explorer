import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Footer, Header } from '@/components';
import { metadataConfig } from '@/config';
import theme from '@/styles/theme';
import '@/styles/global.css';
import BackToTopButton from '@/components/BackToTop';

export const metadata = metadataConfig;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            {children}
            <Footer/>
            <BackToTopButton />
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Analytics />
      </body>
    </html>
  );
}
