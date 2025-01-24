export interface Epoch {
  id: number;
  hash: string;
  poolsRegistry: string[];
  shardsRegistry: string[];
  startTimestamp: number;
  quorum: string[];
  leadersSequence: string[];
}

export interface EpochExtendedData extends Epoch {
  isFirst: boolean;
  isCurrent: boolean;
  shardsNumber: number;
  validatorsNumber: number;
  quorumSize: number;
  totalBlocksNumber: number;
  totalTxsNumber: number;
  txsSuccessRate: string;
}