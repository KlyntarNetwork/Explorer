import ContractPage from "./ContractPage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contract info",
};

interface Props {
  params: {
    id: string;
  };
}

export default function ContractByIdPage({ params }: Props) {
  return <ContractPage params={params} />;
}
