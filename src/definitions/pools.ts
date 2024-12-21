export interface Pool {
  
  isActiveValidator: boolean;
  isCurrentQuorumMember: boolean;
  
  poolOriginShard: string;
  poolMetadata: {
    type: string;
    lang: string;
    balance: number;
    gas: number;
    storages: string[];
    storageAbstractionLastPayment: number;
  };
  poolStorage: {
    activated: boolean;
    percentage: number;
    totalStakedKly: number;
    totalStakedUno: number;
    stakers: Stakers;
    poolURL: string;
    wssPoolURL: string;
  };
}

export interface Stakers {
  [key: string]: {
    kly: number;
    uno: number;
    reward: number;
  }
}