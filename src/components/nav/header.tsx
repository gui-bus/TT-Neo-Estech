"use client";
//#region Imports
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "@/src/components/theme/themeSwitcher";
//#endregion

export const Header = () => {
  return (
    <header className="w-full drop-shadow-xl bg-brand">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/neoestech.png" alt="Logo" width={60} height={60} />
        </Link>

        {/* LINKS - THEME SWITCHER */}
        <div className="flex items-center gap-6">
          {/* LINKS */}
          <nav className="hidden md:flex gap-4 text-sm font-medium">
            <Link
              href="/"
              className="text-white hover:-translate-y-1 transition-all duration-300"
            >
              Dashboard
            </Link>

            <Link
              href="/chamados"
              className="text-white hover:-translate-y-1 transition-all duration-300"
            >
              Chamados
            </Link>
          </nav>

          {/* THEME SWITCHER */}
          <ThemeSwitcher iconClassName="text-white" />
        </div>
      </div>
    </header>
  );
};
