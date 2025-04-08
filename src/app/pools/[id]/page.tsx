import { Metadata } from "next";
import { ContentBlock, EntityPageLayout, PageContainer } from "@/components/ui";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { fetchPoolById } from "@/data";
import { truncateMiddle } from "@/helpers";
import { StakersTable } from "./StakersTable";
import PoolImage from "@public/icons/pages/pool2.svg";
import Web3 from "web3";
import { Language, Telegram } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import Discord from "@public/icons/social/Discord.svg";
import MoveUpIcon from "@mui/icons-material/MoveUp";

interface Props {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Pool info",
};

export default async function PoolByIdPage({ params }: Props) {
  const poolId = decodeURIComponent(params.id);
  const pool = await fetchPoolById(poolId);

  return (
    <PageContainer sx={{ py: 6 }}>
      <EntityPageLayout
        header={{
          title: "Pool info",
          clipBoardValue: poolId,
          value: truncateMiddle(poolId),
          label: {
            variant: pool.isActiveValidator ? "green" : "red",
            value: `${Web3.utils.fromWei(
              pool.poolStorage.totalStakedKly,
              "ether"
            )} (${
              pool.isActiveValidator
                ? "sufficient to be validator"
                : "insufficient to be validator"
            })`,
          },
          actionText: {
            value: "Total staking power",
          },
        }}
        items={[
          [
            <ContentBlock key="staking_link" title="Staking link:">
              <Button
                component="a"
                variant="contained"
                color="primary"
                href={`https://klyntar.org/staking?validator=${
                  poolId.split("(")[0]
                }`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StakingLink"
                sx={{ width: "208px" }}
              >
                Stake here
              </Button>
            </ContentBlock>,

            <ContentBlock key="multistaking_link" title="Multistaking link:">
              <Button
                component="a"
                variant="contained"
                color="primary"
                href={`https://klyntar.org/multistaking?validator=${
                  poolId.split("(")[0]
                }`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MultistakingLink"
                sx={{ width: "208px" }}
              >
                Multistake here
              </Button>
            </ContentBlock>,
          ],

          [
            <ContentBlock key="socials" title="Socials:">
              <Box display="flex" gap={2}>
                {/* Twitter */}
                <IconButton
                  component="a"
                  href={"https://x.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <XIcon />
                </IconButton>
                {/* Website */}
                <IconButton
                  component="a"
                  href={"https://klyntar.org"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                >
                  <Language />
                </IconButton>
                {/* Discord */}
                <IconButton
                  component="a"
                  href={"https://discord.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                >
                  <Discord />
                </IconButton>
                {/* Telegram */}
                <IconButton
                  component="a"
                  href={"https://telegram.org"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                >
                  <Telegram />
                </IconButton>
              </Box>
            </ContentBlock>,
            <ContentBlock
              key="shard"
              title="Creation shard:"
              value={pool.poolOriginShard}
            />,
          ],
          [
            <ContentBlock
              key="quorum_member_status"
              title="In current quorum:"
              value={pool.isCurrentQuorumMember ? "Yes" : "No"}
            />,
            <ContentBlock
              key="contract"
              title="Contract:"
              value="system/staking"
            />,
          ],
          [
            <ContentBlock
              key="kly"
              title="Staked KLY:"
              value={Web3.utils.fromWei(
                pool.poolStorage.totalStakedKly,
                "ether"
              )}
            />,
            <ContentBlock
              key="uno"
              title="Staked UNO (multistaking points):"
              value={Web3.utils.fromWei(
                pool.poolStorage.totalStakedUno,
                "ether"
              )}
            />,
          ],
          <ContentBlock
            key="percentage"
            title="Percentage:"
            value={pool.poolStorage.percentage + "% (takes the pool)"}
          />,
        ]}
      >
        <PoolImage/>
      </EntityPageLayout>

      <Box sx={{ mt: 16 }}>
        <Typography variant="h1">Stakers</Typography>
        <StakersTable
          poolStakers={pool.poolStorage.stakers}
          poolOriginShard={pool.poolOriginShard}
        />
      </Box>
    </PageContainer>
  );
}
