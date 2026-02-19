//#region Imports
import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "@/src/lib/providers/providers";
import { ThemeProvider } from "next-themes";
import { Header } from "@/src/components/nav/header";
import BackgroundImages from "../components/common/backgroundImages";
import { Footer } from "../components/nav/footer";
//#endregion

//#region Fonts
const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});
//#endregion

//#region Metadata
export const metadata: Metadata = {
  title: "Teste Técnico | NEO Estech",
  description: "Teste técnico para a empresa NEO Estech.",
};
//#endregion

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${manrope.variable} antialiased w-full max-w-440 mx-auto`}
      >
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Providers>
            <Header />
            {children}
            <Footer />
            <BackgroundImages />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
