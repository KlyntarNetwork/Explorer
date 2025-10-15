import { Metadata } from 'next';
import { FaucetPage } from './FaucetPage';

export const metadata: Metadata = {
  title: 'Testnet faucet | Klyntar Explorer',
  description: 'Request KLY testnet tokens directly from the Klyntar explorer.',
};

const Page = () => {
  return <FaucetPage />;
};

export default Page;
