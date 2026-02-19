//#region Imports
import { TicketPriority } from "@/src/lib/constants/tickets";
import {
  CaretDoubleUpIcon,
  IconProps,
  CaretUpIcon,
  EqualsIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";
import { ReactElement } from "react";
//#endregion

//#region Interfaces
interface PriorityLabelProps {
  priority: TicketPriority;
  className?: string;
}

interface PriorityConfigItem {
  color: string;
  label: string;
  icon: ReactElement<IconProps>;
}
//#endregion

/**
 * PriorityLabel component
 * @description Renders a label with a color, label, and icon based on the priority of the ticket
 * @param {PriorityLabelProps} props - PriorityLabel props
 * @returns {JSX.Element} - JSX element
 * @example
 * <PriorityLabel priority="Crítica" />
 */
export const PriorityLabel = ({ priority, className }: PriorityLabelProps) => {
  //#region Maps
  const priorityMap: Record<TicketPriority, PriorityConfigItem> = {
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

  const priorityDetails = priorityMap[priority];
  //#endregion

  return (
    <div
      className={`flex items-center gap-1.5 w-fit font-semibold text-[12px] uppercase tracking-tight ${className}`}
      style={{ color: priorityDetails.color }}
    >
      <span className="flex items-center shrink-0">{priorityDetails.icon}</span>
      <span>{priorityDetails.label}</span>
    </div>
  );
};
