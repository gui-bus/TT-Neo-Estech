"use client";
//#region Imports
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import useIsLoaded from "@/src/lib/hooks/common/useIsLoaded";
import { useCallback } from "react";
import { useTheme } from "next-themes";
//#endregion

const ThemeSwitcher = () => {
  //#region Hooks
  const { theme, setTheme } = useTheme();
  const { isLoaded } = useIsLoaded();
  //#endregion

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full hover:border-neutral-900 transition-all duration-300 group active:scale-90 cursor-pointer"
      title="Alternar Tema"
    >
      {isLoaded &&
        (theme === "dark" ? (
          <SunIcon
            size={16}
            className="transition-colors text-white"
            weight="duotone"
          />
        ) : (
          <MoonIcon size={16} className="transition-colors" weight="duotone" />
        ))}
    </button>
  );
};

export default ThemeSwitcher;
