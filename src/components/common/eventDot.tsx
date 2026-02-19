//#region Imports
import { Ticket } from "@/src/lib/types/tickets";
//#endregion

const EventDot = ({ selectedTicket }: { selectedTicket: Ticket }) => {
  return (
    <div className="relative flex flex-col gap-1">
      {/* DOT */}
      <div className="absolute -left-5 top-1 w-3.5 h-3.5 rounded-full bg-brand shadow-sm" />

      {/* DATETIME - TEXT */}
      <div className="pl-3 flex flex-col gap-1">
        {/* DATETIME */}
        <span className="text-[12px] uppercase">
          {new Date(selectedTicket.abertura).toLocaleString("pt-BR")}
        </span>

        {/* TEXT */}
        <span className="text-sm">Abertura do Chamado</span>
      </div>
    </div>
  );
};

export default EventDot;
