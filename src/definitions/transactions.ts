import { BlockExtendedView } from './blocks';

export enum TX_TYPE {
  TX = 'TX',
  EVM_CALL = 'EVM_CALL',
  WVM_CALL = 'WVM_CALL',
  WVM_CONTRACT_DEPLOY = 'WVM_CONTRACT_DEPLOY'
}

export interface Transaction {
  v: number;
  creator: string;
  type: string;
  nonce: number;
  fee: string;
  payload: any;
  sigType: string;
  sig: string;
}

export interface TransactionWithTxHash extends Transaction {
  txHash: string;
}

export interface EVMTransaction {
  payload: string;
}

export interface TransactionReceipt {
  shard: string;
  blockID: string;
  order: number;
  isOk: boolean;
  reason?: string;
  createdContractAddress?: string;
  extraDataToReceipt?: string;
  priorityFee: string
  totalFee: string
}

export interface TransactionExtendedView extends TransactionReceipt, TransactionWithTxHash {
  block: BlockExtendedView;
  typeDescription: string;
  creatorFormatDescription: string;
}

export interface TransactionPreview {
  txid: string;
  txType: string;
  sigType: string;
  priorityFee: string;
  totalFee: string;
  creator?: string;
}