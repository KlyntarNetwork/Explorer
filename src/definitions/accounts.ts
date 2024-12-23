export interface UserAccount {
  type: string;
  balance: string;
  nonce: number;
  gas: number;
  pqcPub?: string;
  rev_t?: number;
}

export interface ContractAccount {
  type: string;
  lang: string;
  balance: string;
  gas: number;
  storages: string[];
  storageAbstractionLastPayment: number;
}

