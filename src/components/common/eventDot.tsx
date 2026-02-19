//#region Imports
import { Ticket } from "@/src/lib/types/tickets";
//#endregion

//#region Interfaces
interface EventDotProps {
  selectedTicket: Ticket;
  type: "abertura" | "ultimaAtualizacao";
}
//#endregion

const EventDot = ({ selectedTicket, type }: EventDotProps) => {
  return (
    <div className="relative flex flex-col gap-1">
      {/* DOT */}
      <div className="absolute -left-5 top-1 w-3.5 h-3.5 rounded-full bg-brand shadow-sm" />

      {/* DATETIME - TEXT */}
      <div className="pl-3 flex flex-col gap-1">
        {/* DATETIME */}
        <span className="text-[12px] uppercase">
          {new Date(
            type === "abertura"
              ? selectedTicket.abertura
              : selectedTicket.ultimaAtualizacao,
          ).toLocaleDateString("pt-BR")}
        </span>

        {/* TEXT */}
        <span className="text-sm">
          {type === "abertura"
            ? "Abertura do chamado"
            : "Última atualização do chamado"}
        </span>
      </div>
    </div>
  );
};

export default EventDot;
