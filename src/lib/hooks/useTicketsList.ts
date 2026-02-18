//#region Imports
import { useQuery } from "@tanstack/react-query";
import { Ticket } from "@/src/lib/types/tickets";
import { mockedTickets } from "@/src/mocks/ticketsData";
import {
  TicketArea,
  TicketPriority,
  TicketStatus,
} from "@/src/lib/constants/tickets";
//#endregion

//#region Interfaces
export interface TicketsFilters {
  page: number;
  pageSize: number;
  status?: TicketStatus;
  priority?: TicketPriority;
  area?: TicketArea;
  text?: string;
  sortField?: string;
  sortOrder?: "ascend" | "descend" | null;
}
//#endregion

export const useTicketsList = (params: TicketsFilters) => {
  return useQuery({
    queryKey: ["TicketsList", params],
    queryFn: async () => {
      //#region Fake promise
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let result = [...mockedTickets];
      //#endregion

      //#region Filters
      if (params.status)
        result = result.filter((t) => t.status === params.status);
      if (params.priority)
        result = result.filter((t) => t.prioridade === params.priority);
      if (params.area) result = result.filter((t) => t.area === params.area);
      if (params.text) {
        const search = params.text.toLowerCase();
        result = result.filter((t) => t.titulo.toLowerCase().includes(search));
      }
      //#endregion

      //#region Sort
      if (params.sortField && params.sortOrder) {
        result.sort((a, b) => {
          const field = params.sortField as keyof Ticket;
          let valA = a[field] ?? "";
          let valB = b[field] ?? "";

          if (field === "abertura" || field === "ultimaAtualizacao") {
            valA = new Date(valA as string).getTime();
            valB = new Date(valB as string).getTime();
          }

          if (params.sortOrder === "ascend") return valA > valB ? 1 : -1;
          return valA < valB ? 1 : -1;
        });
      }
      //#endregion

      //#region Pagination
      const total = result.length;
      const start = (params.page - 1) * params.pageSize;
      const paginatedData = result.slice(start, start + params.pageSize);
      //#endregion

      //#region Return
      return {
        tickets: paginatedData,
        total,
      };
      //#endregion
    },
    placeholderData: (previousData) => previousData,
    retry: 1,
    staleTime: 1000 * 60,
  });
};
