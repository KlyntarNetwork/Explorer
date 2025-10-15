'use client';
import React, { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

interface OutlinedButtonProps extends Omit<ButtonProps, 'variant'> {
  icon?: React.ReactElement;
  text?: string;
  url?: string;
}

const StyledButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.border.main,
  color: theme.palette.text.primary,
  borderWidth: '1px',
  borderRadius: 0,
  padding: 0,
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export const OutlinedButton: FC<OutlinedButtonProps> = ({
  icon,
  text,
  url = '',
  sx,
  onClick,
  ...rest
}) => {
  const isLink = !!url;
  const hasText = Boolean(text);

  const dimensions = hasText
    ? {
        px: {
          xs: 1.5,
          md: 2.5,
        },
        minWidth: 'auto',
      }
    : {
        width: {
          xs: '38px',
          md: '44px',
        },
        minWidth: {
          xs: '38px',
          md: '44px',
        },
      };

  const commonProps = {
    sx: {
      height: {
        xs: '38px',
        md: '44px',
      },
      ...dimensions,
      ...sx,
    },
    variant: 'outlined' as const,
    ...rest,
  };

  if (isLink) {
    return (
      // @ts-ignore - Next.js Link typing
      <StyledButton {...commonProps} component={Link} href={url} onClick={onClick}>
        {icon && icon}
        {text && text}
      </StyledButton>
    );
  }

  return (
    <StyledButton
      {...commonProps}
      component='button'
      onClick={onClick}
    >
      {icon && icon}
      {text && text}
    </StyledButton>
  );
};
