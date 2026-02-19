"use client";
//#region Imports
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "@/src/components/theme/themeSwitcher";
import { Avatar, Skeleton } from "antd";
import useIsLoaded from "@/src/lib/hooks/common/useIsLoaded";
//#endregion

export const Header = () => {
  //#region Hooks
  const { isLoaded } = useIsLoaded();
  //#endregion

  return (
    <header className="w-full drop-shadow-xl px-4 h-20 flex items-center justify-between">
      {/* LOGO */}
      {isLoaded ? (
        <Link href="/chamados" className="flex items-center gap-2">
          <Image src="/neoestech.png" alt="Logo" width={50} height={50} />
        </Link>
      ) : (
        <Skeleton.Button
          block
          active
          style={{ height: 50 }}
          className="w-12.5!"
        />
      )}

      {/* THEME SWITCHER - AVATAR */}
      {isLoaded ? (
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
      ) : (
        <Skeleton.Button
          block
          active
          style={{ height: 40 }}
          className="w-40!"
        />
      )}
    </header>
  );
};
