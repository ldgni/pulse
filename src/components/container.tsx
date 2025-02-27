export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="container max-w-screen-md p-4">{children}</div>;
}
