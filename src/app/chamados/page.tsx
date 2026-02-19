//#region Imports
import { Suspense } from "react";
import Container from "@/src/components/common/container";
import { TicketsTable } from "@/src/components/ticket/ticketsTable";
import { Skeleton } from "antd";
//#endregion

//#region Metadata
export const metadata = {
  title: "Visão geral - Chamados | NEO Estech",
};
//#endregion

export default function TicketsPage() {
  return (
    <Container>
      <Suspense fallback={<Skeleton active />}>
        <TicketsTable />
      </Suspense>
    </Container>
  );
}
