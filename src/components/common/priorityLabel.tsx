//#region Imports
import { priorityMap } from "@/src/lib/constants/maps";
import { TicketPriority } from "@/src/lib/constants/tickets";
//#endregion

//#region Interfaces
interface PriorityLabelProps {
  priority: TicketPriority;
  className?: string;
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
