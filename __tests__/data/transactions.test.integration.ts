import { fetchTransactionByTxHash, fetchAccountTransactions } from '@/data';

describe('fetchTransactionByTxHash Integration Test', () => {
  it('should fetch and return extended transaction data by Hash correctly', async () => {
    const txHash = 'de0ef64b4f2f7dd6c756eeeb7930bfba50be46792ec927d286d07a80401503e8';
    const result = await fetchTransactionByTxHash(txHash);

    expect(typeof result).toBe('object');

    expect(typeof result.v).toBe('number');
    expect(typeof result.txHash).toBe('string');
    expect(typeof result.creator).toBe('string');
    expect(typeof result.type).toBe('string');
    expect(typeof result.nonce).toBe('number');
    expect(typeof result.fee).toBe('string');
    expect(typeof result.sig).toBe('string');

    expect(typeof result.blockID).toBe('string');
    expect(typeof result.order).toBe('number');
    expect(typeof result.isOk).toBe('boolean');
    if (!result.isOk) {
      expect(typeof result.reason).toBe('string');
    }

    expect(result.payload).toBeDefined();
    expect(result.block).toBeDefined();

    expect(typeof result.typeDescription).toBe('string');
    expect(typeof result.creatorFormatDescription).toBe('string');
  });
});

describe('fetchAccountTransactions Integration Test', () => {
  it('should fetch and return user transactions by shard and account ID correctly', async () => {
    const shard = 'shard_0';
    const accountId = '3JAeBnsMedzxjCMNWQYcAXtwGVE9A5DBQyXgWBujtL9R';
    const result = await fetchAccountTransactions(shard, accountId);

    expect(Array.isArray(result)).toBeTruthy();

    result.forEach(tx => {
      expect(typeof tx.txid).toBe('string');
      expect(typeof tx.txType).toBe('string');
      expect(typeof tx.sigType).toBe('string');
      expect(typeof tx.proposedFee).toBe('string');
      expect(typeof tx.realFee).toBe('string');
    });
  });
});