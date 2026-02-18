//#region Imports
import type {
  TicketArea,
  TicketPriority,
  TicketStatus,
} from "@/src/lib/constants/tickets";
//#endregion

//#region Interfaces
export interface Ticket {
  id: number;
  titulo: string;
  area: TicketArea;
  prioridade: TicketPriority;
  status: TicketStatus;
  equipamento: string;
  instalacao: string;
  abertura: string;
  ultimaAtualizacao: string;
  descricao: string;
  responsavel: string | null;
  avatar?: string;
}
//#endregion
