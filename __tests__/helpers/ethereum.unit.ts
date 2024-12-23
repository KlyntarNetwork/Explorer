import { EVMTransaction, TransactionWithTxHash, TX_TYPE } from '@/definitions';
import { parseEvmTransaction } from '@/helpers';

describe('parseEvmTransaction', () => {
  test('parses EVM transaction payload and returns a transaction with hash', () => {
    const tx: EVMTransaction = {
      payload: '0xf8bf808502540be4008259d894407d73d8a49eeb85d32cf465507dd71d507100c188128dfa6a90b28000b850f09f92a1204b4c594e544152202d3e203465333464326130623231633534613130613430633864393931383766386463656365626666353031663961313565303932333066313866663261633438303882396aa0dfb70f2fe4102ea4681a86ceb1fd3f16104198e1d6ad500e10a9346135598556a019490293c6aec6df8112eee924ec18ec68e303ee6da17cc3c85aad201d09f64f'
    };

    const txResult = parseEvmTransaction(tx);

    expect(txResult).toEqual({
      txHash: '0x0416afec24bb8010e39a79663c695fdfdf26576fd1605cfcddec7a7c9611da8d',
      v: 0,
      creator: '0x069bdf66961ce2d38ebe48dd2e095f2c8015ac82',
      type: TX_TYPE.EVM_CALL,
      nonce: 0,
      fee: '230000000000000',
      payload: {
        to: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
        value: '1.337',
        evmBytecode: 'f09f92a1204b4c594e544152202d3e2034653334643261306232316335346131306134306338643939313837663864636563656266663530316639613135653039323330663138666632616334383038'
      },
      sigType: 'ECDSA',
      sig: 'ECDSA'
    } as TransactionWithTxHash);
  })
});