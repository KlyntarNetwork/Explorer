"use client";

import React, { useState, useEffect } from "react";
import { Metadata } from "next";
import NotFoundPage from "@/app/not-found";
import { Box, Typography, Tabs, Tab } from "@mui/material";
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
import AccountImage from "@public/icons/pages/account.svg";
import Web3 from "web3";

const metadata: Metadata = {
  title: "Account info",
};

interface Props {
  params: {
    id: string;
  };
}

export default function AccountByIdPage({ params }: Props) {
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
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Loading...</Typography>
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
            <ContentBlock
              key="balance"
              title="Balance:"
              value={Web3.utils.fromWei(account.balance, "ether") + " KLY"}
            />,
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
        <AccountImage width={421} height={426} viewBox="0 0 421 426" />
      </EntityPageLayout>

      <TabSection transactions={transactions} />
    </PageContainer>
  );
}

function TabSection({ transactions }: { transactions: TransactionPreview[] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ mt: 10, overflowX: "auto", whiteSpace: "nowrap" }}>
      <Tabs
        sx={{ mb: 10, minWidth: "max-content" }}
        value={activeTab}
        onChange={(_, newIndex) => setActiveTab(newIndex)}
      >
        <Tab label="Transactions" />
        <Tab label="Staking data" />
        <Tab label="Portfolio" />
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
    </Box>
  );
}
