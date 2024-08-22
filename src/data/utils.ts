import { BlockStats, Epoch, EpochExtendedData } from '@/definitions';

export const getInfoFromEpoch = (epoch: Epoch): Pick<EpochExtendedData, 'shardsNumber' | 'validatorsNumber' | 'quorumSize'> => {
  const shardsNumber = Object.keys(epoch.leadersSequence).length;

  let validatorsNumber = 0;
  for (const reservePools of Object.values(epoch.leadersSequence)) {
    validatorsNumber += reservePools.length + 1;
  }

  const quorumSize = epoch.quorum.length;

  return {
    shardsNumber,
    validatorsNumber,
    quorumSize
  }
}

export const getTxSuccessRate = (stats: BlockStats): string => {
  return (stats.successfulTxsNumber / stats.totalTxsNumber * 100).toFixed(2) + '%'
}