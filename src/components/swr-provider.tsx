"use client";

import { SWRConfig } from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}
