export const API_ROUTES = {
  STATS: {
    VERIFICATION_THREAD_STATS: 'verification_thread_stats',
    VERIFICATION_THREAD_STATS_PER_EPOCH: (epochId: number) => `verification_thread_stats_per_epoch/${epochId}`,
    RECENT_VERIFICATION_THREAD_STATS_PER_EPOCH: (limit: number) => `historical_stats_per_epoch/latest/${limit}`
  },
  EPOCH: {
    CURRENT_EPOCH_AT: 'current_epoch/at',  // Approvement thread
    EPOCH_BY_ID: (epochId: number) => `epoch_by_index/${epochId}`,
  },
  CHAIN: {
    INFO: 'chain_info',
    CURRENT_SHARDS_LEADERS: 'current_leader',
    SYNCHRONIZATION_STATS: 'synchronization_stats',
  },
  BLOCKS: {
    LATEST_N_BLOCKS: (shard: string, startIndex: number, limit: number) => `latest_n_blocks/${startIndex}/${limit}`,
    BLOCK_BY_SID: (shard: string, indexInShard: string) => `block_by_sid/${indexInShard}`,
    BLOCK_BY_ID: (blockId: string) => `block/${blockId}`,
    AGGREGATED_FINALIZATION_PROOF: (blockId: string) => `aggregated_finalization_proof/${blockId}`,
  },
  POOL: {
    POOL_STATS: (poolId: string) => `pool_stats/${poolId}`,
  },
  TRANSACTIONS: {
    TX_RECEIPT: (txHash: string) => `tx_receipt/${txHash}`,
    ACCOUNT_TRANSACTIONS: (shard: string, accountId: string) => `txs_list/${accountId}`
  },
  ACCOUNTS: {
    ACCOUNT_BY_ID: (shard: string, accountId: string) => `account/${accountId}`
  }
};
