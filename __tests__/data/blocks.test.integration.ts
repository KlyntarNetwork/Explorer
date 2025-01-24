import { fetchAggregatedFinalizationProof, fetchBlockById, fetchBlocksByShard } from '@/data';
import { AggregatedFinalizationProof, BlockExtendedView } from '@/definitions';

describe('fetchBlocksByShard Integration Test', () => {
  it('should fetch and return an array of block previews correctly', async () => {
    const shard = 'shard_0';
    const currentPage = 1;
    const result = await fetchBlocksByShard(shard,currentPage);

    expect(Array.isArray(result)).toBeTruthy();

    const block = result[0];

    expect(typeof block.id).toBe('string');
    expect(typeof block.sid).toBe('string');
    expect(typeof block.creator).toBe('string');
    expect(typeof block.epochId).toBe('number');
    expect(typeof block.index).toBe('number');
    expect(typeof block.txsNumber).toBe('number');
    expect(typeof block.createdAt).toBe('string');
  });
});

describe('fetchBlockById Integration Test', () => {
  const commonAssertions = (result: BlockExtendedView) => {
    expect(typeof result.id).toBe('string');
    expect(typeof result.truncatedId).toBe('string');
    expect(typeof result.creator).toBe('string');
    expect(typeof result.epochId).toBe('number');
    expect(typeof result.index).toBe('number');
    expect(typeof result.createdAt).toBe('string');
    expect(typeof result.txsNumber).toBe('number');
    expect(Array.isArray(result.transactions)).toBeTruthy();
    expect(typeof result.aggregatedFinalizationProof).toBe('object');
    expect(typeof result.prevHash).toBe('string');
  }

  it('should fetch and return extended block data by SID correctly', async () => {
    const shard = 'shard_0';
    const indexInShard = 0;
    const SID = shard + ':' + indexInShard;

    const result = await fetchBlockById(SID);

    expect(typeof result).toBe('object');

    commonAssertions(result);
  });

  it('should fetch and return extended block data by BlockID correctly', async () => {
    const pubkey = '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK';
    const epochId = 0;
    const indexInEpoch = 0;
    const BlockID = epochId + ':' + pubkey + ':' + indexInEpoch;

    const result = await fetchBlockById(BlockID);

    expect(typeof result).toBe('object');

    commonAssertions(result);
  });
});

describe('fetchAggregatedFinalizationProof Integration Test', () => {
  const commonAssertions = (result: AggregatedFinalizationProof) => {
    expect(typeof result.prevBlockHash).toBe('string');
    expect(typeof result.blockID).toBe('string');
    expect(typeof result.blockHash).toBe('string');

    expect(typeof result.proofs).toBe('object');
    Object.keys(result.proofs).forEach(shard => {
      expect(typeof result.proofs[shard]).toBe('string');
    });
  };

  it('should fetch and return aggregated finalization proof by SID correctly', async () => {
    const shard = 'shard_0';
    const indexInShard = 0;
    const SID = shard + ':' + indexInShard;

    const result = await fetchAggregatedFinalizationProof(SID);

    expect(typeof result).toBe('object');

    commonAssertions(result);
  });

  it('should fetch and return aggregated finalization proof by BlockID correctly', async () => {
    const pubkey = '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK';
    const epochId = 0;
    const indexInEpoch = 0;
    const BlockID = epochId + ':' + pubkey + ':' + indexInEpoch;

    const result = await fetchAggregatedFinalizationProof(BlockID);

    expect(typeof result).toBe('object');

    commonAssertions(result);
  });
});
