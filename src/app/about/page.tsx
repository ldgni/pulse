export default function AboutPage() {
  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-bold">About</h1>
      <div className="mx-auto max-w-screen-sm rounded border p-2 text-center text-sm shadow-sm sm:p-4 sm:text-base">
        <p className="mb-4">
          The data displayed on this website is fetched from the{" "}
          <a
            href="https://www.football-data.org/"
            target="blank"
            className="text-blue-500 hover:underline">
            football-data.org
          </a>{" "}
          API.
        </p>
        <p className="mb-4">
          To optimize page load times, the API is limited to 20 matches.
        </p>
        <p>Times are displayed in the UTC+1 timezone.</p>
      </div>
    </>
  );
}
