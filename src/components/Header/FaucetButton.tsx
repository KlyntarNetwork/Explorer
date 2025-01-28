import { FC } from 'react';
import { OutlinedButton } from '@/components/ui';
import { SxProps, Typography } from '@mui/material';
import { KLY_LINKS } from '@/config';
import FaucetIcon from '@public/icons/pages/faucet.svg';
import Link from 'next/link';

export const FaucetButton: FC<{
  sx?: SxProps,
  variant?: 'icon' | 'text'
}> = ({ sx, variant = 'icon' }) => {
  const isIcon = variant === 'icon';

  if (isIcon) {
    return (
      <OutlinedButton
        icon={<FaucetIcon />}
        url={KLY_LINKS.TESTNET_FAUCET}
        sx={{ px: 1, ...sx }}
      />
    );
  }

  return (
    <Typography
      variant='caption'
      sx={{
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: 2.5,
        ...sx
      }}
    >
      <Link
        href={KLY_LINKS.TESTNET_FAUCET}
        style={{
          color: 'inherit',
          textDecoration: 'inherit',
          textDecorationThickness: 'inherit',
        }}
      >
        Testnet Faucet
      </Link>
    </Typography>
  )
}