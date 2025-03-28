import { Metadata } from "next";
import { PrettyJSON } from "@/components";
import { ParsedBytecodeDisplay } from "./ParsedBytecodeDisplay";
import TxSubcallsMap from "./TxSubcallsMap";
import {
  ContentBlock,
  EntityPageLayout,
  Label,
  PageContainer,
} from "@/components/ui";
import {
  describeTransactionCreatorFormat,
  fetchAccountById,
  fetchTransactionByTxHash,
} from "@/data";
import { truncateMiddle } from "@/helpers";
import { TX_TYPE } from "@/definitions";
import Web3 from "web3";

interface Props {
  params: {
    hash: string;
  };
}

export const metadata: Metadata = {
  title: "Transaction info",
};

export default async function TransactionByIdPage({ params }: Props) {
  const txHash = decodeURIComponent(params.hash);
  const tx = await fetchTransactionByTxHash(txHash);

  // In case it's EVM account - make this request to check the EVM account type (if it's EOA or contract)

  const interactedWithAccount = await fetchAccountById(tx.shard, tx.payload.to);

  // Depending on tx type we need to visualize if it's interaction with a contract or average transaction (address => address)

  let contentBlock = null;

  if (tx.createdContractAddress) {
    contentBlock = (
      <ContentBlock
        key="created_contract_address"
        title="Created contract:"
        value={tx.createdContractAddress}
        url={`/contracts/${tx.shard}:${tx.createdContractAddress}`}
      />
    );
  } else if (
    tx.type === TX_TYPE.EVM_CALL &&
    interactedWithAccount.type === "contract"
  ) {
    contentBlock = (
      <ContentBlock
        key="called_contract"
        title="Called contract:"
        value={truncateMiddle(tx.payload.to)}
        comment={describeTransactionCreatorFormat(tx.payload.to)}
        url={
          tx.payload.to.includes("system")
            ? `/contracts/${tx.payload.to.split("/")[1]}`
            : `/contracts/${tx.shard}:${tx.payload.to}`
        }
      />
    );
  } else if (tx.payload.to) {
    contentBlock = (
      <ContentBlock
        key="recipient"
        title="Recipient:"
        value={truncateMiddle(tx.payload.to)}
        comment={describeTransactionCreatorFormat(tx.payload.to)}
        url={`/users/${tx.shard}:${tx.payload.to}`}
      />
    );
  } else if (tx.payload.contractID) {
    contentBlock = (
      <ContentBlock
        key="called_contract"
        title="Called contract:"
        value={truncateMiddle(tx.payload.contractID)}
        url={`/contracts/${tx.shard}:${tx.payload.contractID}`}
      />
    );
  }

  return (
    <PageContainer sx={{ py: 6 }}>
      <EntityPageLayout
        header={{
          title: "Transaction info",
          clipBoardValue: tx.txHash,
          value: truncateMiddle(tx.txHash),
          label: {
            variant: tx.isOk ? "green" : "red",
            value: tx.isOk ? "Success" : "Failed",
          },
          actionText: {
            url: `/tx/${tx.txHash}/details`,
            value: "View raw details",
          },
        }}
        items={[
          <ContentBlock key="shard" title="Shard:" value={tx.shard} />,
          [
            <ContentBlock
              key="creator"
              title="Creator:"
              value={truncateMiddle(tx.creator)}
              comment={tx.creatorFormatDescription}
              url={`/users/${tx.shard}:${tx.creator}`}
            />,
            contentBlock,
          ],
          [
            <ContentBlock
              key="type"
              title="Type:"
              value={tx.type}
              comment={tx.typeDescription}
            />,
            <ContentBlock
              key="version"
              title="Coins transferred:"
              value={
                Web3.utils.fromWei(
                  tx.payload.amount || tx.payload.value || "0",
                  "ether"
                ) + " KLY"
              }
            />,
            <ContentBlock key="nonce" title="Nonce: " value={tx.nonce} />,
          ],
          <ContentBlock key="signature" title="Signature:" value={tx.sig} />,
          <ContentBlock
            key="256_bit_tx_hash"
            title="256 bit tx hash:"
            value={tx.txHash}
          />,
          [
            <ContentBlock key="parallelization_type" title="Execution type:">
              <Label
                variant={
                  Array.isArray(tx.payload.touchedAccounts) ? "green" : "red"
                }
              >
                {Array.isArray(tx.payload.touchedAccounts)
                  ? "Parallel execution⚡"
                  : "Non-parallel execution 🦥"}
              </Label>
            </ContentBlock>,
            <ContentBlock key="fee_details" title="Fee details:">
              <Label variant="blue">
                {tx.payload.gasAbstraction
                  ? "Account Abstraction 2.0 🪄"
                  : "Fee paid in native coin 💸"}
              </Label>
            </ContentBlock>,
          ],
          [
            <ContentBlock
              key="proposed_fee"
              title="Priority fee:"
              value={
                tx.priorityFee
                  ? Web3.utils.fromWei(tx.priorityFee, "ether")
                  : "0"
              }
            />,
            <ContentBlock
              key="real_fee"
              title="Total charged fee:"
              value={
                tx.totalFee ? Web3.utils.fromWei(tx.totalFee, "ether") : "0"
              }
            />,
          ],
          [
            <ContentBlock
              key="included_in_block"
              title="Included in block:"
              value={tx.block.truncatedId}
              url={`/blocks/${tx.block.id}`}
            />,
            <ContentBlock
              key="position_in_block"
              title="Position in block:"
              value={tx.order}
            />,
          ],
          <ContentBlock key="actions_map" title="Actions map:">
            <TxSubcallsMap />
          </ContentBlock>,
          <ContentBlock key="payload" title="Payload(raw):">
            <PrettyJSON data={tx.payload} />
          </ContentBlock>,
          tx.type === TX_TYPE.EVM_CALL && tx.payload.evmBytecode !== "" && (
            <ContentBlock key="input_format" title="Input format:">
              <ParsedBytecodeDisplay bytecode={tx.payload.evmBytecode} />
            </ContentBlock>
          ),
        ]}
      />
    </PageContainer>
  );
}
