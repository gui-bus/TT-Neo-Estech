//#region Imports
import { Ticket } from "@/src/lib/types/tickets";
import { Avatar, Descriptions, Divider, Drawer } from "antd";
import { StatusLabel } from "@/src/components/common/statusLabel";
import { PriorityLabel } from "@/src/components/common/priorityLabel";
import EventDot from "@/src/components/common/eventDot";
//#endregion

//#region Interfaces
interface TicketDetailsDrawerProps {
  selectedTicket: Ticket | null;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}
//#endregion

const TicketDetailsDrawer = ({
  selectedTicket,
  isDrawerOpen,
  setIsDrawerOpen,
}: TicketDetailsDrawerProps) => {
  const publicMapUrl =
    "https://maps.google.com/maps?q=-23.5505,-46.6333&t=&z=12&ie=UTF8&iwloc=&output=embed";

  return (
    <Drawer
      title={`Detalhes do Chamado #${selectedTicket?.id}`}
      placement="right"
      size="large"
      onClose={() => setIsDrawerOpen(false)}
      open={isDrawerOpen}
      destroyOnHidden
    >
      {selectedTicket && (
        <div className="space-y-6">
          {/* TITLE - STATUS - PRIORITY - AREA - EQUIPMENT - OPEN DATE - RESPONSIBLE */}
          <Descriptions title="Informações Gerais" bordered column={1}>
            {/* TITLE */}
            <Descriptions.Item label="Título do chamado">
              {selectedTicket.titulo}
            </Descriptions.Item>

            {/* STATUS */}
            <Descriptions.Item label="Status">
              <StatusLabel status={selectedTicket.status} className="w-fit!" />
            </Descriptions.Item>

            {/* PRIORITY */}
            <Descriptions.Item label="Prioridade">
              <PriorityLabel
                priority={selectedTicket.prioridade}
                className="w-fit!"
              />
            </Descriptions.Item>

            {/* AREA */}
            <Descriptions.Item label="Área">
              {selectedTicket.area}
            </Descriptions.Item>

            {/* EQUIPMENT */}
            <Descriptions.Item label="Equipamento">
              {selectedTicket.equipamento}
            </Descriptions.Item>

            {/* OPEN DATE */}
            <Descriptions.Item label="Data de Abertura">
              {new Date(selectedTicket.abertura).toLocaleString("pt-BR")}
            </Descriptions.Item>

            {/* RESPONSIBLE */}
            <Descriptions.Item label="Responsável">
              <div className="flex items-center gap-3">
                <Avatar size="small" src={selectedTicket.avatar} />
                <span className="font-medium">
                  {selectedTicket.responsavel}
                </span>
              </div>
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          {/* LOCALIZATION - GOOGLE MAPS IFRAME */}
          <div className="flex flex-col gap-2">
            {/* LOCALIZATION */}
            <h4 className="font-medium mb-2">
              Localização: {selectedTicket.instalacao}
            </h4>

            {/* GOOGLE MAPS IFRAME */}
            <div className="w-full h-64 rounded-xl overflow-hidden border border-gray-200 shadow-inner">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={publicMapUrl}
              ></iframe>
            </div>
          </div>

          {/* DESCRIPTION TITLE - DESCRIPTION */}
          <div className="flex flex-col gap-2">
            {/* DESCRIPTION TITLE */}
            <h4 className="font-medium mb-2">Descrição</h4>

            {/* DESCRIPTION */}
            <p>{selectedTicket.descricao || "Nenhuma descrição detalhada."}</p>
          </div>

          <Divider />

          {/* UPDATE HISTORY TITLE - LINE - OPEN EVENT - UPDATE EVENT */}
          <div className="flex flex-col gap-2">
            {/* UPDATE HISTORY TITLE */}
            <h4 className="font-medium mb-2">Histórico do Chamado</h4>

            {/* LINE - OPEN EVENT - UPDATE EVENT */}
            <div className="relative flex flex-col gap-8 pl-6">
              {/* LINE */}
              <div className="absolute left-2.75 top-2 bottom-2 w-px bg-black/50 dark:bg-white/50" />

              {/* OPEN EVENT */}
              <EventDot selectedTicket={selectedTicket} type="abertura" />

              {/* UPDATE EVENT */}
              {selectedTicket.ultimaAtualizacao &&
                selectedTicket.ultimaAtualizacao !==
                  selectedTicket.abertura && (
                  <EventDot
                    selectedTicket={selectedTicket}
                    type="ultimaAtualizacao"
                  />
                )}
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default TicketDetailsDrawer;
