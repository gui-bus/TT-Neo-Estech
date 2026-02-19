"use client";
//#region Imports
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "@/src/components/theme/themeSwitcher";
//#endregion

export const Header = () => {
  return (
    <header className="w-full drop-shadow-xl px-4 h-20 flex items-center justify-between">
      {/* LOGO */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/neoestech.png" alt="Logo" width={50} height={50} />
      </Link>

      {/* LINKS - THEME SWITCHER */}
      <div className="flex items-center gap-5 divide-x">
        {/* LINKS */}
        <nav className="hidden md:flex gap-5 text-sm font-medium pr-8">
          <Link
            href="/"
            className="hover:-translate-y-1 transition-all duration-300 hover:text-brand! text-black! dark:text-white!"
          >
            Dashboard
          </Link>

          <Link
            href="/chamados"
            className="hover:-translate-y-1 transition-all duration-300 hover:text-brand! text-black! dark:text-white!"
          >
            Chamados
          </Link>
        </nav>

        {/* THEME SWITCHER */}
        <ThemeSwitcher />
      </div>
    </header>
  );
};
