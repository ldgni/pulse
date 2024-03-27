export default function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-secondary">
      <div className="container flex justify-center py-4">
        <p>
          &copy; 2024{" "}
          <a
            href="https://ldgni.io/"
            target="_blank"
            className="text-slate-400 transition-colors hover:text-primary">
            Luca Di Gianni
          </a>
        </p>
      </div>
    </footer>
  );
}
