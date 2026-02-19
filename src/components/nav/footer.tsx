"use client";
//#region Imports
import Link from "next/link";
//#endregion

export const Footer = () => {
  return (
    <footer className="w-full px-4 h-16 flex flex-col md:flex-row items-center justify-between border-t border-white/10 mt-auto pb-5">
      {/* COPYRIGHT */}
      <div className="text-xs opacity-50 cursor-default">
        © 2026 NEO Estech. Todos os direitos reservados.
      </div>

      {/* AUTHOR - VERSION */}
      <div className="flex items-center gap-4">
        {/* AUTHOR */}
        <span className="text-xs cursor-default">
          Desenvolvido por{" "}
          <Link
            href="https://www.linkedin.com/in/gui-bus/"
            target="_blank"
            className="text-brand!"
          >
            Guilherme Bustamante
          </Link>
        </span>

        <div className="h-4 w-px bg-white/10" />

        {/* VERSION */}
        <span className="text-xs font-mono opacity-30">v0.1.0</span>
      </div>
    </footer>
  );
};
