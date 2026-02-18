"use client";
//#region Imports
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "next-themes";
import { useState } from "react";
//#endregion

export default function Providers({ children }: { children: React.ReactNode }) {
  //#region Hooks
  const { theme } = useTheme();
  //#endregion

  //#region useStates
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );
  //#endregion

  return (
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            algorithm:
              theme === "dark"
                ? antdTheme.darkAlgorithm
                : antdTheme.defaultAlgorithm,
            token: { colorPrimary: "#EC6725" },
          }}
        >
          {children}
        </ConfigProvider>
      </AntdRegistry>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
