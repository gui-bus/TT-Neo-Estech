//#region Imports
import Container from "@/src/components/common/container";
import { TicketsTable } from "@/src/components/ticket/ticketsTable";
//#endregion

//#region Metadata
export const metadata = {
  title: "Visão geral - Chamados | NEO Estech",
};
//#endregion

export default function TicketsPage() {
  return (
    <Container>
      <TicketsTable />
    </Container>
  );
}
