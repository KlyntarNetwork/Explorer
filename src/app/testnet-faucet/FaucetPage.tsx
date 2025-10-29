'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { Box, Button, CircularProgress, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { isAddress } from 'ethers';
import { PageContainer } from '@/components/ui';
import { BG_COLORS, COLORS } from '@/styles';

const steps = [
  {
    key: 'input',
    title: 'Submit your address',
    description: 'Paste the testnet address that should receive the KLY tokens.',
  },
  {
    key: 'pending',
    title: 'Transaction in progress',
    description: 'The faucet sends a transaction and waits for the network to confirm it.',
  },
  {
    key: 'success',
    title: 'Tokens credited',
    description: 'Once confirmed, the requested amount appears on your balance.',
  },
] as const;

type Phase = 'idle' | 'pending' | 'success' | 'error';

type FaucetResult = {
  amount?: string | number;
  symbol?: string;
  txHash?: string;
  message?: string;
  raw?: unknown;
};

const normalizeResult = (data: any): FaucetResult => {
  if (!data || typeof data !== 'object') {
    return { raw: data };
  }

  const cast = data as Record<string, any>;
  const nestedResult = typeof cast.result === 'object' ? cast.result : undefined;

  const amount =
    cast.amount ??
    cast.tokens ??
    cast.value ??
    cast.coins ??
    nestedResult?.amount ??
    nestedResult?.tokens ??
    nestedResult?.value ??
    nestedResult?.coins;

  const symbol =
    cast.symbol ??
    cast.token ??
    cast.asset ??
    nestedResult?.symbol ??
    nestedResult?.token ??
    nestedResult?.asset;

  const txHash =
    cast.txHash ??
    cast.tx_hash ??
    cast.transactionHash ??
    cast.tx ??
    cast.hash ??
    nestedResult?.txHash ??
    nestedResult?.tx_hash ??
    nestedResult?.transactionHash ??
    nestedResult?.tx ??
    nestedResult?.hash;

  const message =
    cast.message ??
    cast.status ??
    cast.detail ??
    cast.result ??
    nestedResult?.message ??
    nestedResult?.status ??
    nestedResult?.detail ??
    nestedResult?.result;

  return {
    amount,
    symbol,
    txHash,
    message,
    raw: data,
  };
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Failed to copy to clipboard', error);
  }
};

const StepCircle = ({
  status,
  index,
}: {
  status: 'upcoming' | 'active' | 'complete' | 'error';
  index: number;
}) => {
  const baseStyles = {
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(254, 254, 254, 0.16)',
    background: BG_COLORS.DARK_GRAY,
  } as const;

  if (status === 'complete') {
    return (
      <Box sx={{ ...baseStyles, borderColor: alpha(COLORS.GREEN, 0.35), background: alpha(COLORS.GREEN, 0.12) }}>
        <CheckRoundedIcon sx={{ color: COLORS.GREEN }} />
      </Box>
    );
  }

  if (status === 'error') {
    return (
      <Box sx={{ ...baseStyles, borderColor: alpha(COLORS.RED, 0.4), background: alpha(COLORS.RED, 0.16) }}>
        <ErrorOutlineRoundedIcon sx={{ color: COLORS.RED }} />
      </Box>
    );
  }

  if (status === 'active') {
    return (
      <Box
        sx={{
          ...baseStyles,
          position: 'relative',
          borderColor: alpha(COLORS.CYAN, 0.4),
          background: alpha(COLORS.CYAN, 0.16),
        }}
      >
        {index === 0 ? (
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: COLORS.CYAN,
              animation: 'pulse 1.4s ease-in-out infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)', opacity: 1 },
                '50%': { transform: 'scale(0.7)', opacity: 0.6 },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            }}
          />
        ) : (
          <HourglassBottomRoundedIcon
            sx={{
              color: COLORS.CYAN,
              animation: 'spin 2.6s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '50%': { transform: 'rotate(180deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
        )}
      </Box>
    );
  }

  return (
    <Box sx={baseStyles}>
      <Typography variant='caption' sx={{ fontSize: 14, color: 'text.secondary' }}>
        {index + 1}
      </Typography>
    </Box>
  );
};

const StepConnector = ({ isLast }: { isLast: boolean }) => {
  if (isLast) {
    return null;
  }

  return (
    <Box
      sx={{
        width: 2,
        flex: 1,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)',
        ml: '17px',
      }}
    />
  );
};

export const FaucetPage = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FaucetResult | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = address.trim();

    if (!trimmed) {
      setError('Введите адрес получателя.');
      setPhase('idle');
      setResult(null);
      return;
    }

    if (!isAddress(trimmed)) {
      setError('Похоже, это невалидный адрес. Проверьте формат и попробуйте снова.');
      setPhase('idle');
      setResult(null);
      return;
    }

    setError(null);
    setResult(null);
    setPhase('pending');

    try {
      const response = await fetch('/api/testnet-faucet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: trimmed }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = data?.error || data?.message || 'Не удалось выполнить запрос крану.';
        throw new Error(message);
      }

      setResult(normalizeResult(data));
      setPhase('success');
    } catch (requestError) {
      setPhase('error');
      setResult(null);
      setError(requestError instanceof Error ? requestError.message : 'Неожиданная ошибка. Попробуйте позже.');
    }
  };

  const handleCopy = async (value: string) => {
    await copyToClipboard(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1800);
  };

  const computedSteps = useMemo(() => {
    return steps.map((step, index) => {
      if (phase === 'idle') {
        return index === 0 ? 'active' : 'upcoming';
      }

      if (phase === 'pending') {
        if (index === 0) return 'complete';
        if (index === 1) return 'active';
        return 'upcoming';
      }

      if (phase === 'success') {
        if (index <= 2) return 'complete';
        return 'upcoming';
      }

      if (phase === 'error') {
        if (index === 0) return 'complete';
        if (index === 1) return 'error';
        return 'upcoming';
      }

      return 'upcoming';
    });
  }, [phase]);

  const isLoading = phase === 'pending';
  const isSuccess = phase === 'success';
  const canSubmit = Boolean(address.trim()) && isAddress(address.trim()) && !isLoading;

  const amountLabel = useMemo(() => {
    if (!result?.amount) {
      return null;
    }

    const amountValue =
      typeof result.amount === 'number'
        ? result.amount
        : Number.isNaN(Number(result.amount))
        ? result.amount
        : Number(result.amount);

    const symbol = result.symbol ?? 'KLY';

    if (typeof amountValue === 'number' && !Number.isNaN(amountValue)) {
      return `${amountValue} ${symbol}`;
    }

    return `${result.amount} ${symbol}`.trim();
  }, [result?.amount, result?.symbol]);

  return (
    <PageContainer sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant='h1'>Testnet faucet</Typography>
      <Typography sx={{ mt: 1.5, color: 'text.secondary', maxWidth: 640 }}>
        Request fresh KLY testnet tokens without leaving the explorer. Provide your recipient address, wait a couple of
        seconds for the faucet transaction to land on-chain and track the receipt directly from here.
      </Typography>

      <Box
        sx={{
          mt: { xs: 5, md: 7 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '320px 1fr' },
          gap: { xs: 4, md: 6 },
          borderRadius: 24,
          border: '1px solid rgba(254, 254, 254, 0.14)',
          background: BG_COLORS.DARK_GRAY,
          boxShadow: '0 40px 80px rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(24px)',
          p: { xs: 4, md: 6 },
        }}
      >
        <Box>
          <Typography variant='h6' sx={{ fontSize: 20, fontWeight: 600 }}>
            How it works
          </Typography>
          <Typography sx={{ mt: 1.5, color: 'text.secondary' }}>
            We mirror the behaviour of the main header dropdowns: compact, dark and focused on the action you need.
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {steps.map((step, index) => {
              const status = computedSteps[index] as 'upcoming' | 'active' | 'complete' | 'error';
              const isLast = index === steps.length - 1;

              return (
                <Box key={step.key} sx={{ display: 'flex' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
                    <StepCircle status={status} index={index} />
                    <StepConnector isLast={isLast} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{step.title}</Typography>
                    <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>{step.description}</Typography>
                    {status === 'active' && index === 1 && (
                      <Typography sx={{ mt: 1, color: COLORS.CYAN }}>
                        Waiting for confirmation… keep the tab open.
                      </Typography>
                    )}
                    {status === 'error' && index === 1 && error && (
                      <Typography sx={{ mt: 1, color: COLORS.RED }}>{error}</Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 20,
            border: '1px solid rgba(254, 254, 254, 0.1)',
            background: alpha('#0f0f0f', 0.6),
            p: { xs: 3, md: 4 },
            gap: 3,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 600 }}>Recipient address</Typography>
            <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>
              Use the address of your wallet in the Klyntar testnet. The faucet sends a fixed testing allocation.
            </Typography>
          </Box>

          <TextField
            autoComplete='off'
            fullWidth
            placeholder='0x1234…'
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
              if (error) {
                setError(null);
              }
              if (phase === 'error') {
                setPhase('idle');
              }
            }}
            InputProps={{
              disableUnderline: true,
              sx: {
                borderRadius: 16,
                border: `1px solid ${error ? alpha(COLORS.RED, 0.45) : 'rgba(254, 254, 254, 0.16)'}`,
                background: 'rgba(17, 17, 17, 0.65)',
                px: 2,
                py: 1.5,
                transition: 'border-color 200ms ease',
                '&:hover': {
                  borderColor: error ? alpha(COLORS.RED, 0.6) : 'rgba(254, 254, 254, 0.32)',
                },
                '&.Mui-focused': {
                  borderColor: error ? alpha(COLORS.RED, 0.8) : COLORS.CYAN,
                  boxShadow: error ? '0 0 0 4px rgba(255, 49, 49, 0.25)' : `0 0 0 4px ${alpha(COLORS.CYAN, 0.2)}`,
                },
                '& .MuiInputBase-input': {
                  fontSize: 16,
                },
              },
            }}
          />

          {error && phase !== 'error' && (
            <Typography sx={{ color: COLORS.RED, fontSize: 14 }}>{error}</Typography>
          )}

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { sm: 'center' } }}>
            <Button
              type='submit'
              disabled={!canSubmit}
              sx={{
                flexShrink: 0,
                minWidth: 180,
                borderRadius: 999,
                px: 3,
                py: 1.5,
                background: COLORS.CYAN,
                color: '#050505',
                fontWeight: 600,
                '&:hover': {
                  background: alpha(COLORS.CYAN, 0.8),
                },
                '&.Mui-disabled': {
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: 'rgba(255, 255, 255, 0.4)',
                },
              }}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CircularProgress size={20} sx={{ color: '#050505' }} />
                  <span>Processing…</span>
                </Box>
              ) : (
                'Send me testnet KLY'
              )}
            </Button>

            <Typography sx={{ color: 'text.secondary' }}>
              The faucet currently dispenses a limited batch of tokens per address. You can request again after the
              previous transaction settles.
            </Typography>
          </Box>

          {phase === 'error' && error && (
            <Box
              sx={{
                borderRadius: 14,
                border: `1px solid ${alpha(COLORS.RED, 0.35)}`,
                background: alpha(COLORS.RED, 0.12),
                p: 3,
                color: COLORS.RED,
              }}
            >
              <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Request failed</Typography>
              <Typography>{error}</Typography>
              <Typography sx={{ mt: 1, color: alpha('#ffffff', 0.55) }}>
                Проверьте адрес и попробуйте повторить запрос позже. Если ошибка повторяется — загляните в наш Discord.
              </Typography>
            </Box>
          )}

          {isSuccess && (
            <Box
              sx={{
                borderRadius: 16,
                border: `1px solid ${alpha(COLORS.GREEN, 0.45)}`,
                background: `linear-gradient(135deg, ${alpha(COLORS.GREEN, 0.18)} 0%, rgba(8, 48, 38, 0.65) 100%)`,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <Typography sx={{ fontWeight: 600, color: COLORS.GREEN }}>Tokens are on their way!</Typography>
              {result?.message && (
                <Typography sx={{ color: alpha('#ffffff', 0.85) }}>{result.message}</Typography>
              )}
              {amountLabel && (
                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                  + {amountLabel}
                </Typography>
              )}
              {result?.txHash && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontSize: 14, color: alpha('#ffffff', 0.65) }}>Transaction hash</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                    <Typography
                      sx={{
                        fontFamily: 'var(--font-major-mono-display, monospace)',
                        fontSize: 13,
                        wordBreak: 'break-all',
                      }}
                    >
                      {result.txHash}
                    </Typography>
                    <Tooltip title={isCopied ? 'Copied!' : 'Copy hash'}>
                      <IconButton
                        size='small'
                        onClick={() => handleCopy(result.txHash as string)}
                        sx={{
                          borderRadius: '50%',
                          background: alpha('#ffffff', 0.08),
                          '&:hover': { background: alpha('#ffffff', 0.14) },
                        }}
                      >
                        <ContentCopyIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                    <Button
                      component={Link}
                      href={`/tx/${result.txHash}`}
                      sx={{
                        borderRadius: 999,
                        px: 2,
                        py: 0.75,
                        textTransform: 'none',
                        border: `1px solid ${alpha(COLORS.CYAN, 0.4)}`,
                        color: COLORS.CYAN,
                        '&:hover': {
                          background: alpha(COLORS.CYAN, 0.1),
                        },
                      }}
                    >
                      View in explorer
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </PageContainer>
  );
};
