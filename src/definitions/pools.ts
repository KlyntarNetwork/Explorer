export interface Pool {
  
  isActiveValidator: boolean;
  isCurrentQuorumMember: boolean;
  
  poolOriginShard: string;
  poolMetadata: {
    type: string;
    lang: string;
    balance: string;
    gas: number;
    storages: string[];
    storageAbstractionLastPayment: number;
  };
  poolStorage: {
    activated: boolean;
    percentage: number;
    totalStakedKly: string;
    totalStakedUno: string;
    stakers: Stakers;
    poolURL: string;
    wssPoolURL: string;
  };
}

export interface Stakers {
  [key: string]: {
    kly: string;
    uno: string;
    reward: string;
  }
}