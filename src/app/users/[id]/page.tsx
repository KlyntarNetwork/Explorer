import UserPage from "./UserPage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User info",
};

interface Props {
  params: {
    id: string;
  };
}

export default function AccountByIdPage({ params }: Props) {
  return <UserPage params={params} />;
}
