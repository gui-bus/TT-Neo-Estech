"use client";
//#region Imports
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "@/src/components/theme/themeSwitcher";
import { Avatar } from "antd";
//#endregion

export const Header = () => {
  return (
    <header className="w-full drop-shadow-xl px-4 h-20 flex items-center justify-between">
      {/* LOGO */}
      <Link href="/chamados" className="flex items-center gap-2">
        <Image src="/neoestech.png" alt="Logo" width={50} height={50} />
      </Link>

      {/* THEME SWITCHER - AVATAR */}
      <div className="flex items-center gap-5">
        {/* THEME SWITCHER */}
        <ThemeSwitcher />

        {/* AVATAR */}
        <div className="flex items-center gap-2">
          <Avatar size="large" src="https://i.pravatar.cc/150?img=68" />

          <div className="flex flex-col cursor-default">
            <span className="text-xs">John Doe</span>
            <span className="text-xs opacity-50">johndoe@email.com</span>
          </div>
        </div>
      </div>
    </header>
  );
};
