"use client";

import React, { useState, useEffect } from "react";
import NotFoundPage from "@/app/not-found";
import { Box, Typography, Tabs, Tab, CircularProgress } from "@mui/material";
import {
  ContentBlock,
  EntityPageLayout,
  Label,
  PageContainer,
  TransactionsTable,
} from "@/components/ui";
import { fetchAccountById, fetchAccountTransactions } from "@/data";
import { truncateMiddle } from "@/helpers";
import { TransactionPreview, UserAccount } from "@/definitions";
import AccountImage from "@public/icons/pages/account2.svg";
import CoinIcon from "@public/icons/company/CoinIcon.svg";
import Web3 from "web3";

interface Props {
  params: {
    id: string;
  };
}

export default function UserPage({ params }: Props) {
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [transactions, setTransactions] = useState<TransactionPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [shard, setShard] = useState("");
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let [shard, accountId] = decodeURIComponent(params.id).split(":");
      accountId = accountId.startsWith("0x")
        ? accountId.toLowerCase()
        : accountId;
      setShard(shard);
      setAccountId(accountId);

      try {
        const accountData = await fetchAccountById(shard, accountId);
        const transactionsData = await fetchAccountTransactions(
          shard,
          accountId
        );
        setAccount(accountData as UserAccount);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching account data:", error);
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
          height: "70vh",
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

  if (!account || account.type !== "eoa") {
    return <NotFoundPage />;
  }

  return (
    <PageContainer sx={{ py: 6 }}>
      <EntityPageLayout
        header={{
          title: "Account info",
          clipBoardValue: accountId,
          value: truncateMiddle(accountId),
          label: {
            variant: "green",
            value: "User",
          },
        }}
        items={[
          <ContentBlock
            key="account_id"
            title="Account Id:"
            value={accountId}
          />,
          <ContentBlock key="aliases" title="Also known as:">
            <Label variant="blue">N/A</Label>
          </ContentBlock>,
          [
            <ContentBlock key="shard" title="Shard:" value={shard} />,
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
                {Web3.utils.fromWei(account.balance, "ether")}
                <CoinIcon/>
              </Typography>
            </ContentBlock>,
          ],
          [
            <ContentBlock key="nonce" title="Nonce:" value={account.nonce} />,
            <ContentBlock
              key="abstract_gas"
              title="Abstract gas:"
              value={account.gas}
            />,
          ],
        ]}
      >
        <AccountImage/>
      </EntityPageLayout>

      <TabSection transactions={transactions} />
    </PageContainer>
  );
}

function TabSection({ transactions }: { transactions: TransactionPreview[] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ mt: 10, whiteSpace: "nowrap" }}>
      <Tabs
        sx={{ mb: 10 }}
        value={activeTab}
        onChange={(_, newIndex) => setActiveTab(newIndex)}
        variant="scrollable"
        scrollButtons={'auto'}
        allowScrollButtonsMobile
      >
        <Tab label="Transactions" />
        <Tab label="Staking data" />
        <Tab label="Portfolio" />
        <Tab label="Analytics" />
      </Tabs>

      {activeTab === 0 && (
        <>
          <Typography variant="h1">Transactions</Typography>
          <Typography sx={{ mt: 1, mb: 3 }}>
            Browse through the latest 200 transactions below
          </Typography>
          <TransactionsTable transactions={transactions.reverse()} />
        </>
      )}
      {activeTab === 1 && (
        <Typography textAlign={"center"} sx={{ mt: 3 }}>
          This will be available later
        </Typography>
      )}
      {activeTab === 2 && (
        <Typography textAlign={"center"} sx={{ mt: 3 }}>
          This will be available later
        </Typography>
      )}
      {activeTab === 3 && (
        <Typography textAlign={"center"} sx={{ mt: 3 }}>
          This will be available later
        </Typography>
      )}
    </Box>
  );
}
