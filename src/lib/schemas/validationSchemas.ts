//#region Imports
import z from "zod";
//#endregion

//#region Schemas
// TICKET
export const ticketSchema = z.object({
  titulo: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  area: z.string({ error: "Selecione uma área" }).min(1, "Selecione uma área"),
  prioridade: z
    .string({ error: "Selecione uma prioridade" })
    .min(1, "Selecione uma prioridade"),
  equipamento: z.string().min(2, "Informe o equipamento"),
  descricao: z.string().optional(),
  instalacao: z.string().min(2, "Informe a instalação"),
  responsavel: z.string().min(2, "Informe o responsável"),
});
//#endregion

//#region Schema Types
export type TicketFormData = z.infer<typeof ticketSchema>;
//#endregion
