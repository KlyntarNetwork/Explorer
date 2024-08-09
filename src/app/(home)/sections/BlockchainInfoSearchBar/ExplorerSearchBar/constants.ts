export const FILTER_OPTIONS = {
  CHOOSE: 'choose',
  TRANSACTIONS: 'transaction',
  SHARDS: 'shard',
  BLOCKS: 'block',
  POOLS: 'pool',
  CONTRACTS: 'contract'
};

export const PLACEHOLDER_TEXT = {
  [FILTER_OPTIONS.CHOOSE]: '<-- Apply a filter to look up for a TXID, SID, Block ID, Pool ID or Contract ID',
  [FILTER_OPTIONS.TRANSACTIONS]: 'Enter the 256 bit BLAKE3 hash of transaction',
  [FILTER_OPTIONS.SHARDS]: 'Enter the SID in format <shard>:<index>',
  [FILTER_OPTIONS.BLOCKS]: 'Enter Block ID',
  [FILTER_OPTIONS.POOLS]: 'Enter Pool ID',
  [FILTER_OPTIONS.CONTRACTS]: 'Enter Contract ID',
};