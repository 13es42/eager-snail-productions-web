import { Metadata } from "next";

// Correct Props interface to match Next.js expectations
type Props = {
  params: {
    userName: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ProfilePage({ params }: Props) {
  const { userName } = params;
  return <h1>Details about user {userName}</h1>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userName } = params;

  return {
    title: `${userName}'s Profile | Eager Snail Productions`,
  };
}