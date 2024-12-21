import { fetchPoolById } from '@/data';

describe('fetchPoolById Integration Test', () => {
  it('should fetch and return pool by ID correctly', async () => {
    const poolId = '9GQ46rqY238rk2neSwgidap9ww5zbAN4dyqyC7j5ZnBK(POOL)';
    const result = await fetchPoolById(poolId);

    expect(typeof result).toBe('object');

    expect(typeof result.poolOriginShard).toBe('string');

    expect(typeof result.poolMetadata.type).toBe('string');
    expect(typeof result.poolMetadata.lang).toBe('string');
    expect(typeof result.poolMetadata.balance).toBe('number');
    expect(typeof result.poolMetadata.gas).toBe('number');

    expect(Array.isArray(result.poolMetadata.storages)).toBeTruthy();
    result.poolMetadata.storages.forEach(s => expect(typeof s).toBe('string'));

    expect(typeof result.poolMetadata.storageAbstractionLastPayment).toBe('number');

    expect(typeof result.poolStorage.activated).toBe('booolean');
    expect(typeof result.poolStorage.percentage).toBe('number');
    expect(typeof result.poolStorage.totalStakedKly).toBe('number');
    expect(typeof result.poolStorage.totalStakedUno).toBe('number');
    expect(typeof result.poolStorage.poolURL).toBe('string');
    expect(typeof result.poolStorage.wssPoolURL).toBe('string');

    expect(typeof result.poolStorage.stakers).toBe('object');

    const stakers = result.poolStorage.stakers;
    Object.keys(stakers).forEach(stakerKey => {
      const staker = stakers[stakerKey];
      expect(typeof staker.kly).toBe('number');
      expect(typeof staker.uno).toBe('number');
      expect(typeof staker.reward).toBe('number');
    });
  });
});