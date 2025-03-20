import { Metadata } from 'next';
import { ContentBlock, EntityPageLayout, PageContainer } from '@/components/ui';
import { Box, Typography, IconButton } from '@mui/material';
import { fetchPoolById } from '@/data';
import { truncateMiddle } from '@/helpers';
import { StakersTable } from './StakersTable';
import PoolImage from '@public/icons/pages/pool.svg';
import Web3 from 'web3';
import { Language, Telegram } from '@mui/icons-material'; // Импорт иконок
import XIcon from '@mui/icons-material/X';
import Discord from '@public/icons/social/Discord.svg';

interface Props {
  params: {
    id: string;
  }
}

export const metadata: Metadata = {
  title: 'Pool info',
};

export default async function PoolByIdPage({ params }: Props) {
  const poolId = decodeURIComponent(params.id);
  const pool = await fetchPoolById(poolId);

  return (
    <PageContainer sx={{ py: 6 }}>
      <EntityPageLayout
        header={{
          title: 'Pool info',
          clipBoardValue: poolId,
          value: truncateMiddle(poolId),
          label: {
            variant: pool.isActiveValidator ? 'green' : 'red',
            value: `${Web3.utils.fromWei(pool.poolStorage.totalStakedKly, 'ether')} (${pool.isActiveValidator ? 'sufficient to be validator' : 'insufficient to be validator'})`
          },
          actionText: {
            value: 'Total staking power'
          }
        }}
        items={[
          <ContentBlock key="pool_id" title="Pool Id:" value={poolId} />,
          [<ContentBlock key="socials" title="Socials:">
            <Box display="flex" gap={2}>
              {/* Twitter */}
              <IconButton
                component="a"
                href={'https://x.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <XIcon />
              </IconButton>
              {/* Website */}
              <IconButton
                component="a"
                href={'https://klyntar.org'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
              >
                <Language />
              </IconButton>
              {/* Discord */}
              <IconButton
                component="a"
                href={'https://discord.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <Discord />
              </IconButton>
              {/* Telegram */}
              <IconButton
                component="a"
                href={'https://telegram.org'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <Telegram />
              </IconButton>
            </Box>
          </ContentBlock>,
          <ContentBlock key="shard" title="Creation shard:" value={pool.poolOriginShard} />],
          [
            <ContentBlock key="quorum_member_status" title="In current quorum:" value={pool.isCurrentQuorumMember ? 'Yes' : 'No'} />,
            <ContentBlock key="contract" title="Contract:" value="system/staking" />,
          ],
          [
            <ContentBlock
              key="kly"
              title="Staked KLY:"
              value={Web3.utils.fromWei(pool.poolStorage.totalStakedKly, 'ether')}
            />,
            <ContentBlock
              key="uno"
              title="Staked UNO (multistaking points):"
              value={Web3.utils.fromWei(pool.poolStorage.totalStakedUno, 'ether')}
            />
          ],
          <ContentBlock
            key="percentage"
            title="Percentage:"
            value={pool.poolStorage.percentage + '% (takes the pool)'}
          />
        ]}
      >
        <PoolImage width={421} height={426} viewBox="0 0 421 426" />
      </EntityPageLayout>

      <Box sx={{ mt: 16 }}>
        <Typography variant="h1">Stakers</Typography>
        <StakersTable poolStakers={pool.poolStorage.stakers} poolOriginShard={pool.poolOriginShard} />
      </Box>
    </PageContainer>
  );
}
