import { fetchAccountById } from '@/data';
import { UserAccount, ContractAccount } from '@/definitions';

describe('fetchAccountById Integration Tests', () => {
  const shard = 'shard_0';
  const ed25519AccountId = 'EGU4u3Anwahbtbx8F1ZZgFQSg2u49EkrkqMERT9r3q1o';
  const blsAccountId = '0x8f079049121d5e2ae885bdc6581df9fb68eab94a7aa3ae54bfe1d1ac35aceefbb202f656b0c1b56d64583630612a9970';
  const pqcAccountId = '4218fb0aaace62c4bfafbdd9adb05b99a9bf1a33eeae074215a51cb644b9a85c';
  const contractAccountId = '0000000000000000000000000000000000000000000000000000000000000000';

  it('should fetch Ed25519 account details correctly', async () => {
    const result = await fetchAccountById(shard, ed25519AccountId) as UserAccount;

    expect(typeof result).toBe('object');

    expect(result.type).toEqual('eoa');
    expect(typeof result.balance).toBe('string');
    expect(typeof result.nonce).toBe('number');
    expect(typeof result.gas).toBe('number');
  });

  it('should fetch BLS account details correctly', async () => {
    const result = await fetchAccountById(shard, blsAccountId) as UserAccount;

    expect(typeof result).toBe('object');

    expect(result.type).toEqual('eoa');
    expect(typeof result.balance).toBe('string');
    expect(typeof result.nonce).toBe('number');
    expect(typeof result.gas).toBe('number');
    expect(typeof result.rev_t).toBe('number');
  });

  it('should fetch PQC account details correctly', async () => {
    const result = await fetchAccountById(shard, pqcAccountId) as UserAccount;

    expect(typeof result).toBe('object');

    expect(result.type).toEqual('eoa');
    expect(typeof result.balance).toBe('string');
    expect(typeof result.nonce).toBe('number');
    expect(typeof result.gas).toBe('number');
    expect(typeof result.pqcPub).toBe('string');
  });

  it('should fetch Contract account details correctly', async () => {
    const result = await fetchAccountById(shard, contractAccountId) as ContractAccount;

    expect(typeof result).toBe('object');

    expect(result.type).toEqual('contract');
    expect(typeof result.lang).toBe('string');
    expect(typeof result.balance).toBe('string');
    expect(typeof result.gas).toBe('number');

    expect(Array.isArray(result.storages)).toBeTruthy();
    result.storages.forEach(storage => {
      expect(typeof storage).toBe('string');
    });

    expect(typeof result.storageAbstractionLastPayment).toBe('number')
  });
});
