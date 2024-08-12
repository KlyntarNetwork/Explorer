import { Box, Container, Typography, Grid } from '@mui/material';
import { PrettyJSON } from '@/components';
import {
  DimGradientBackground,
  GradientBackground,
  BlurredInfoBlock,
  Label
} from '@/components/ui';

type TransactionByIdPageProps = {
  params: {
    transactionId: string
  }
}

const tx = {
  creator: '9GQ46rqY2C7j5Z9GQ46rqY2C7j5ZnBK9GQ46rqY2C7j5ZnBK9GQ46rqY2C7j5ZnBKnBK',
  type: 'TX',
  version: 0,
  nonce: 16,
  signature: '9GQ46rqY2C7j5Z9GQ46rqY2C7j5ZnBK9GQ46rqY2C7j5ZnBK9GQ46rqY2C7j5ZnBKnBK',
  includedInBlock: '0123456789abcd89abcdef0123456789abcdef0123456789abcd89abcdef0123456789abcdef',
  positionInBlock: 23,
  status: 'Success', // or "Failed",
  payload: {
    "to": "0123456789abcd89abcdef0123456789abcdef0123456789abcd89abcdef0123456789abcdef",
    "amount": 2999,
    "other": {
      "misc": null
    }
  }
}

export default function TransactionByIdPage({ params }: TransactionByIdPageProps) {
  const isApproved = tx.status.toLowerCase().includes('success');

  return (
    <>
      <DimGradientBackground>
        <GradientBackground sx={{ pt: 7, pb: 1 }}>
          <Container maxWidth='xl'>
            <Box sx={{ px: { md: 4.5, xs: 0 } }}>
              <Typography variant='h1'>Transaction info</Typography>

              <Grid container spacing={1} sx={{ mt: 5 }}>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Creator:'
                    value={tx.creator}
                    comment='Ed25519'
                    breakWord={true}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Version:'
                    value={tx.version}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Type:'
                    value={tx.type}
                    comment='Simple address to address tx'
                    breakWord={true}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Nonce: '
                    value={tx.nonce}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BlurredInfoBlock
                    title='Signature:'
                    value={tx.signature}
                    breakWord={true}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Included in block:'
                    value={tx.includedInBlock}
                    breakWord={true}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <BlurredInfoBlock
                    title='Position in block:'
                    value={tx.positionInBlock}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BlurredInfoBlock title='Status:'>
                    <Label variant={isApproved ? 'green' : 'red'}>
                      {tx.status}
                    </Label>
                  </BlurredInfoBlock>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </GradientBackground>
      </DimGradientBackground>

      <Container maxWidth='xl' sx={{ pb: 7 }}>
        <Box sx={{ px: { md: 4.5, xs: 0 } }}>
          <BlurredInfoBlock title='Payload:'>
            <PrettyJSON data={tx.payload} />
          </BlurredInfoBlock>
        </Box>
      </Container>
    </>
  );
}