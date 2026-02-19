//#region Imports
import { Tag } from "antd";
import { TicketStatus } from "@/src/lib/constants/tickets";
import { statusMap } from "@/src/lib/constants/maps";
//#endregion

//#region Interfaces
interface StatusLabelProps {
  status: TicketStatus;
  className?: string;
}
//#endregion

/**
 * StatusTag component
 * @param {TicketStatus} status - The status of the ticket
 * @param {string} [className] - The class name to be applied to the component
 * @returns {ReactElement} - The StatusTag component
 * @description This component renders a tag with a color, label, and icon based on the status of the ticket.
 * @example
 * <StatusTag status="Aberto" />
 */
export const StatusLabel = ({ status, className }: StatusLabelProps) => {
  //#region Maps
  const statusDetails = statusMap[status];
  //#endregion

  return (
    <Tag
      color={statusDetails.color}
      variant="outlined"
      className={`flex! items-center gap-1.5 w-full text-center rounded-3xl! ${className}`}
    >
      <span className="flex items-center">{statusDetails.icon}</span>
      <span className="font-medium text-[11px] tracking-wider">
        {statusDetails.label.toUpperCase()}
      </span>
    </Tag>
  );
};
