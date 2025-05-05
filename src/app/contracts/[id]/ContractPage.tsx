"use client";

import { fetchAccountById, fetchAccountTransactions } from "@/data";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import { formatOrdinal, truncateMiddle } from "@/helpers";
import {
  ContentBlock,
  EntityPageLayout,
  Label,
  PageContainer,
  TransactionsTable,
} from "@/components/ui";
import { ContractAccount, TransactionPreview } from "@/definitions";
import ContractImage from "@public/icons/pages/contract2.svg";
import NotFoundPage from "@/app/not-found";
import Web3 from "web3";
import { CircularProgress } from "@mui/material";
import CoinIcon from "@public/icons/company/CoinIcon.svg";
import { InteractionSection } from "../InteractionSection";

interface Props {
  params: {
    id: string;
  };
}

export default function ContractPage({ params }: Props) {
  const [contract, setContract] = useState<ContractAccount | null>(null);
  const [transactions, setTransactions] = useState<TransactionPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [systemContractUI, setSystemContractUI] = useState(false);
  const [shardId, setShardId] = useState("");
  const [contractId, setContractId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const decodedComponent = decodeURIComponent(params.id);

      let shardId = "";
      let contractId = "";
      let systemContractUI = false;

      if (!decodedComponent.includes(":")) {
        systemContractUI = true;
        shardId = "x";
        contractId = decodedComponent;
      } else {
        let [shardID, contractID] = decodedComponent.split(":");
        shardId = shardID;
        contractId = contractID;
      }

      setShardId(shardId);
      setContractId(contractId);
      setSystemContractUI(systemContractUI);

      try {
        const contractData = await fetchAccountById(shardId, contractId);
        const transactionsData = await fetchAccountTransactions(
          shardId,
          contractId
        );
        setContract(contractData as ContractAccount);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching contract data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "65vh",
        }}
      >
        <CircularProgress
          sx={{
            color: "white",
            animation: "rotate 1.5s linear infinite",
            width: "50px",
            height: "50px",
          }}
        />
      </Box>
    );
  }

  if (!contract || contract.type !== "contract") {
    return <NotFoundPage />;
  }

  return (
    <PageContainer sx={{ py: 6 }}>
      <EntityPageLayout
        header={{
          title: "Account info",
          clipBoardValue: contractId,
          value: truncateMiddle(contractId),
          label: { variant: "green", value: "Contract" },
        }}
        items={[
          <ContentBlock
            key="contract_id"
            title="Contract Id:"
            value={contractId}
          />,
          <ContentBlock key="aliases" title="Also known as:">
            <Label variant="blue">N/A</Label>
          </ContentBlock>,
          [
            <ContentBlock key="shard" title="Shard:" value={shardId} />,
            <ContentBlock key="balance" title="Balance:">
              <Typography
                sx={{
                  fontSize: "24px",
                  lineHeight: "30px",
                  fontWeight: 300,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
                color="primary.main"
              >
                {Web3.utils.fromWei(contract.balance, "ether")}
                <CoinIcon />
              </Typography>
            </ContentBlock>,
          ],
          [
            <ContentBlock
              key="last_payment_for_storage_usage"
              title="Last payment for storage usage:"
              value={
                formatOrdinal(contract.storageAbstractionLastPayment) + " epoch"
              }
            />,
            <ContentBlock
              key="abstract_gas"
              title="Abstract gas:"
              value={contract.gas}
            />,
          ],
          <ContentBlock key="language" title="Language:">
            <Label variant={getColorForLanguage(contract.lang)}>
              {contract.lang}
            </Label>
          </ContentBlock>,
          !systemContractUI && (
            <ContentBlock
              key="list_of_storage_cells"
              title="List of storage cells:"
            >
              {contract.storages.map((storage) => (
                <Typography key={storage} color="primary.main">
                  • {storage}
                </Typography>
              ))}
            </ContentBlock>
          ),
        ]}
      >
        <ContractImage />
      </EntityPageLayout>

      <TabSection contractId={contractId} transactions={transactions} />
    </PageContainer>
  );
}

function TabSection({
  contractId,
  transactions,
}: {
  contractId: string;
  transactions: TransactionPreview[];
}) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box sx={{ mt: 10, whiteSpace: "nowrap" }}>
      <Tabs
        sx={{ mb: 10 }}
        value={tabIndex}
        onChange={(_, newIndex) => setTabIndex(newIndex)}
        variant="scrollable"
        scrollButtons={"auto"}
        allowScrollButtonsMobile
      >
        <Tab label="Transactions" />
        <Tab label="Staking data" />
        <Tab label="Portfolio" />
        <Tab label="Source code" />
        <Tab label="Interaction" />
        <Tab label="Storage" />
        <Tab label="Events" />
        <Tab label="Analytics" />
      </Tabs>

      {tabIndex === 0 && (
        <>
          <Typography variant="h1" sx={{ mt: 2 }}>
            Transactions
          </Typography>
          <Typography sx={{ mt: 1, mb: 3 }}>
            Browse through the latest 200 transactions below
          </Typography>
          <TransactionsTable transactions={transactions.reverse()} />
        </>
      )}
      {tabIndex === 1 && (
        <Typography textAlign={"center"} sx={{ mt: 2 }}>
          This will be available later
        </Typography>
      )}
      {tabIndex === 2 && (
        <Typography textAlign={"center"} sx={{ mt: 2 }}>
          This will be available later
        </Typography>
      )}
      {tabIndex === 3 && (
        <Typography textAlign={"center"} sx={{ mt: 2 }}>
          This will be available later
        </Typography>
      )}
      {tabIndex === 4 && <InteractionSection address={contractId} />}
      {tabIndex === 5 && (
        <Typography textAlign={"center"} sx={{ mt: 2 }}>
          This will be available later
        </Typography>
      )}
      {tabIndex === 6 && (
        <Typography textAlign={"center"} sx={{ mt: 2 }}>
          This will be available later
        </Typography>
      )}
      {tabIndex === 7 && (
        <Typography textAlign={"center"} sx={{ mt: 2 }}>
          This will be available later
        </Typography>
      )}
    </Box>
  );
}

function getColorForLanguage(
  lang: string
): "blue" | "red" | "orange" | "silver" | "green" {
  const langLower = lang.toLowerCase();
  return langLower === "assemblyscript"
    ? "blue"
    : langLower === "rust"
    ? "red"
    : langLower === "solidity"
    ? "orange"
    : langLower.includes("system")
    ? "silver"
    : "green";
}
