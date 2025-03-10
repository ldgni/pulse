import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-semibold">About</h1>
      <div className="mx-auto max-w-2xl space-y-2 rounded-lg border border-zinc-300 p-4 text-center">
        <p>
          The data displayed on this website is fetched from the{" "}
          <a
            href="https://www.football-data.org/"
            target="blank"
            className="text-blue-500 hover:underline">
            football-data.org
          </a>{" "}
          API.
        </p>
        <p>To optimize page load times, the API is limited to 20 matches.</p>
        <p>Times are being shown in UTC+1 format.</p>
      </div>
    </>
  );
}
