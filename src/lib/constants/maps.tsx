//#region Imports
import {
  CaretDoubleUpIcon,
  CaretDownIcon,
  CaretUpIcon,
  CheckCircleIcon,
  CircleDashedIcon,
  ClockClockwiseIcon,
  EqualsIcon,
  XCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { TicketPriority, TicketStatus } from "@/src/lib/constants/tickets";
import { ReactElement } from "react";
import { IconProps } from "@phosphor-icons/react";
//#endregion

//#region Interfaces
interface StatusConfigItem {
  color: string;
  label: string;
  icon: ReactElement<IconProps>;
}

interface PriorityConfigItem {
  color: string;
  label: string;
  icon: ReactElement<IconProps>;
}
//#endregion

//#region Maps
// STATUS
export const statusMap: Record<TicketStatus, StatusConfigItem> = {
  Aberto: {
    color: "blue",
    label: "Aberto",
    icon: <CircleDashedIcon size={14} weight="duotone" />,
  },
  "Em andamento": {
    color: "orange",
    label: "Em andamento",
    icon: <ClockClockwiseIcon size={14} weight="duotone" />,
  },
  Resolvido: {
    color: "green",
    label: "Resolvido",
    icon: <CheckCircleIcon size={14} weight="duotone" />,
  },
  Cancelado: {
    color: "red",
    label: "Cancelado",
    icon: <XCircleIcon size={14} weight="duotone" />,
  },
};

// PRIORITY
export const priorityMap: Record<TicketPriority, PriorityConfigItem> = {
  Crítica: {
    color: "#f5222d",
    label: "Crítica",
    icon: <CaretDoubleUpIcon size={16} weight="duotone" />,
  },
  Alta: {
    color: "#faad14",
    label: "Alta",
    icon: <CaretUpIcon size={16} weight="duotone" />,
  },
  Média: {
    color: "#1890ff",
    label: "Média",
    icon: <EqualsIcon size={16} weight="duotone" />,
  },
  Baixa: {
    color: "#8c8c8c",
    label: "Baixa",
    icon: <CaretDownIcon size={16} weight="duotone" />,
  },
};
//#endregion
