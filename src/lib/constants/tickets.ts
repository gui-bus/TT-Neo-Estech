//#region TICKET AREAS
export const TICKET_AREAS = [
  "Refrigeração",
  "Energia",
  "Ar-condicionado",
  "Água",
] as const;

export type TicketArea = (typeof TICKET_AREAS)[number];
//#endregion

//#region TICKET PRIORITIES
export const TICKET_PRIORIDADES = [
  "Crítica",
  "Alta",
  "Média",
  "Baixa",
] as const;

export type TicketPriority = (typeof TICKET_PRIORIDADES)[number];
//#endregion

//#region TICKET STATUS
export const TICKET_STATUS = [
  "Aberto",
  "Em andamento",
  "Resolvido",
  "Cancelado",
] as const;

export type TicketStatus = (typeof TICKET_STATUS)[number];
//#endregion
