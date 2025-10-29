import { NextResponse } from 'next/server';

const upstreamUrl = process.env.TESTNET_FAUCET_API_URL ?? 'https://klyntar.org/api/testnet-faucet';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const address = typeof body?.address === 'string' ? body.address.trim() : '';

  if (!address) {
    return NextResponse.json({ error: 'Address is required.' }, { status: 400 });
  }

  if (!upstreamUrl) {
    return NextResponse.json({ error: 'Faucet endpoint is not configured.' }, { status: 500 });
  }

  try {
    const response = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
      cache: 'no-store',
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = (data as { message?: string; error?: string })?.message || (data as { error?: string }).error;
      return NextResponse.json({ error: message ?? 'Faucet request failed.' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected faucet error.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
