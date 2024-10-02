import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-6 text-center text-neutral-400 text-sm bg-gray-900 ">
      <p>
        © {new Date().getFullYear()}{" "}
        <Link
          href="https://alexfrankcodes.com"
          target="_blank"
          className="hover:text-primary transition-colors"
        >
          Alex Frank
        </Link>
      </p>
      <p>
        Created with{" "}
        <Link
          href="https://nextjs.org"
          className="hover:text-primary transition-colors"
        >
          Next.js
        </Link>
        ,{" "}
        <Link
          href="https://tailwindcss.com"
          className="hover:text-primary transition-colors"
        >
          Tailwind CSS
        </Link>
        , and{" "}
        <Link
          href="https://ui.shadcn.com"
          className="hover:text-primary transition-colors"
        >
          shadcn/ui
        </Link>
      </p>
    </footer>
  );
}
