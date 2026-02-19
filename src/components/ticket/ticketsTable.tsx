"use client";
//#region Imports
import { useEffect, useState } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Result,
  Segmented,
  Skeleton,
} from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { Ticket } from "@/src/lib/types/tickets";
import { TicketParams, useTicketsList } from "@/src/lib/hooks/useTicketsList";
import {
  TicketArea,
  TicketPriority,
  TicketStatus,
} from "@/src/lib/constants/tickets";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowsClockwiseIcon,
  ChartBarIcon,
  PlusIcon,
  WrenchIcon,
} from "@phosphor-icons/react";
import TicketDetailsDrawer from "@/src/components/ticket/ticketDetailsDrawer";
import PageTitle from "@/src/components/common/pageTitle";
import { StatusLabel } from "@/src/components/common/statusLabel";
import { PriorityLabel } from "@/src/components/common/priorityLabel";
import { NewTicketModal } from "@/src/components/ticket/newTicketForm";
import { TicketsDashboard } from "./ticketsDashboard";
import { syncUrlParams } from "@/src/lib/utils/ticketUrl";
const { Search } = Input;
//#endregion

//#region Types
type ViewType = "tecnico" | "gestor";
//#endregion

export const TicketsTable = () => {
  //#region Params
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Returns the initial params for the DataTable component based on the current searchParams.
   *
   * @returns An object with the following properties:
   *   - page: The current page number (defaults to 1 if not provided).
   *   - pageSize: The current page size (defaults to 10 if not provided).
   *   - text: The current search text (defaults to an empty string if not provided).
   *   - status: The current ticket status filter (defaults to undefined if not provided).
   *   - priority: The current ticket priority filter (defaults to undefined if not provided).
   *   - area: The current ticket area filter (defaults to undefined if not provided).
   */
  const getInitialParams = (): TicketParams => ({
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
    text: searchParams.get("text") || "",
    status: (searchParams.get("status") as TicketStatus) || undefined,
    priority: (searchParams.get("priority") as TicketPriority) || undefined,
    area: (searchParams.get("area") as TicketArea) || undefined,
  });

  /**
   * Returns the initial view type based on the current searchParams.
   * If the "view" param is not provided, it defaults to "tecnico".
   * If the "view" param is provided, it must be either "tecnico" or "gestor".
   * @returns A string with the value of "tecnico" or "gestor".
   */
  const getInitialView = (): ViewType => {
    const v = searchParams.get("view");
    return v === "gestor" ? "gestor" : "tecnico";
  };
  //#endregion

  //#region useStates
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [params, setParams] = useState<TicketParams>(getInitialParams());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [view, setView] = useState<ViewType>(getInitialView());

  const [forceError, setForceError] = useState(false);
  const [forceEmpty, setForceEmpty] = useState(false);
  //#endregion

  //#region Hooks
  const paramsBasedOnSelectedView =
    view === "tecnico" ? params : { ...params, page: 1, pageSize: 9999 };

  const { data, isLoading, isError, refetch } = useTicketsList(
    paramsBasedOnSelectedView,
  );
  //#endregion

  //#region useEffects
  useEffect(() => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );

    const { newParams, hasChanged } = syncUrlParams(
      currentParams,
      view,
      params,
    );

    if (hasChanged) {
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    }
  }, [params, view, pathname, router, searchParams]);
  //#endregion

  //#region Handle functions
  /**
   * Handles a change in a filter for the DataTable component.
   *
   * @param {keyof TicketParams} key The key of the filter to be changed.
   * @param {TicketParams[keyofTicketsFilters]} value The new value of the filter.
   *
   * Resets the page number to 1 and updates the params state with the new filter value.
   */
  const handleFilterChange = <K extends keyof TicketParams>(
    key: K,
    value: TicketParams[K],
  ) => {
    setParams((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  /**
   * Handles a change in the DataTable component, updating the params state with the new page number, sort field and sort order.
   *
   * @param {TablePaginationConfig} pagination The new pagination configuration.
   * @param {Record<string, FilterValue | null>} _filters The new filters configuration.
   * @param {SorterResult<Ticket> | SorterResult<Ticket>[]} sorter The new sorter configuration.
   */
  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Ticket> | SorterResult<Ticket>[],
  ) => {
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;
    setParams((prev) => ({
      ...prev,
      page: pagination.current || 1,
      sortField: singleSorter.field as string,
      sortOrder: singleSorter.order as "ascend" | "descend" | null,
    }));
  };
  //#endregion

  //#region Constants
  const columns: ColumnsType<Ticket> = [
    {
      title: "Título do chamado",
      dataIndex: "titulo",
      key: "titulo",
      render: (_, record) => (
        <span className="font-semibold">{record.titulo}</span>
      ),
    },
    {
      title: "Área",
      dataIndex: "area",
      key: "area",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: TicketStatus) => StatusLabel({ status }),
      width: 150,
    },
    {
      title: "Prioridade",
      dataIndex: "prioridade",
      key: "prioridade",
      render: (prioridade: TicketPriority) =>
        PriorityLabel({ priority: prioridade }),
      sorter: true,
      width: 150,
    },
    {
      title: "Abertura",
      dataIndex: "abertura",
      key: "abertura",
      render: (date: string) => new Date(date).toLocaleDateString("pt-BR"),
      sorter: true,
      width: 150,
    },
  ];

  const ticketsCount =
    !isLoading && data?.total !== undefined ? `${data.total}` : "";

  const isTechnicalView = view === "tecnico";
  //#endregion

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5">
        {/* TITLE - ADD TICKET BUTTON - TICKETS COUNT */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-5">
          <PageTitle
            iconSrc="/icons/ticket.png"
            title="Visão Geral"
            description="Acompanhe o progresso das ordens de serviço abertas."
            isLoading={isLoading}
          />

          {/* ADD TICKET BUTTON - VIEW SELECTOR */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-5 w-full md:w-fit!">
            {/* ADD TICKET BUTTON */}
            {isTechnicalView &&
              (isLoading ? (
                <Skeleton.Button
                  block
                  active
                  style={{ height: 32 }}
                  className="w-full! md:w-44!"
                />
              ) : (
                <Button
                  size="medium"
                  variant="solid"
                  color="primary"
                  icon={<PlusIcon weight="duotone" />}
                  className="w-full md:w-fit uppercase"
                  onClick={() => setIsModalOpen(true)}
                >
                  Criar chamado
                </Button>
              ))}

            {/* VIEW SELECTOR */}
            {isLoading ? (
              <Skeleton.Button
                block
                active
                style={{ height: 32 }}
                className="w-full! md:w-44!"
              />
            ) : (
              <Segmented
                options={[
                  {
                    label: (
                      <div className="flex items-center gap-2 px-1">
                        <WrenchIcon size={18} />
                        <span>Técnico</span>
                      </div>
                    ),
                    value: "tecnico",
                  },
                  {
                    label: (
                      <div className="flex items-center gap-2 px-1">
                        <ChartBarIcon size={18} />
                        <span>Gestor</span>
                      </div>
                    ),
                    value: "gestor",
                    disabled: forceError || forceEmpty,
                  },
                ]}
                value={view}
                onChange={(value) => setView(value as "tecnico" | "gestor")}
                className="p-1 bg-gray-100 rounded-lg"
              />
            )}
          </div>
        </div>

        {isTechnicalView && (
          <>
            {/* FILTER (SEARCH (TEXT INPUT) | STATUS | PRIORITY | AREA | PAGE SIZE) */}
            <div className="flex flex-col lg:flex-row items-center w-full justify-between gap-5">
              {/* SEARCH (TEXT INPUT) */}
              {isLoading ? (
                <Skeleton.Button
                    active
                    block
                    size="small"
                    style={{ height: 32 }}
                    className="w-full! md:w-38!"
                  />
              ) : (
                <Search
                  placeholder="Pesquise pelo título do chamado"
                  onSearch={(value) => handleFilterChange("text", value)}
                  defaultValue={params.text}
                  className="w-full lg:max-w-md"
                  allowClear
                />
              )}

              {/* FILTERS (STATUS | PRIORITY | AREA | PAGE SIZE) */}
              <div className="grid grid-cols-2 lg:flex lg:flex-row gap-5 w-full lg:w-fit">
                {/* STATUS */}
                {isLoading ? (
                  <Skeleton.Button
                    active
                    block
                    size="small"
                    style={{ height: 32 }}
                    className="w-full! md:w-38!"
                  />
                ) : (
                  <Select
                    showSearch
                    placeholder="Selecione o status"
                    style={{ width: 140 }}
                    allowClear
                    value={params.status}
                    onChange={(val) => handleFilterChange("status", val)}
                    options={[
                      { value: "Aberto", label: "Aberto" },
                      { value: "Em andamento", label: "Em andamento" },
                      { value: "Resolvido", label: "Resolvido" },
                      { value: "Cancelado", label: "Cancelado" },
                    ]}
                    className="w-full! lg:w-fit!"
                  />
                )}

                {/* PRIORITY */}
                {isLoading ? (
                  <Skeleton.Button
                    active
                    block
                    size="small"
                    style={{ height: 32 }}
                    className="w-full! md:w-38!"
                  />
                ) : (
                  <Select
                    showSearch
                    placeholder="Selecione a prioridade"
                    style={{ width: 140 }}
                    allowClear
                    value={params.priority}
                    onChange={(val) => handleFilterChange("priority", val)}
                    options={[
                      { value: "Crítica", label: "Crítica" },
                      { value: "Alta", label: "Alta" },
                      { value: "Media", label: "Média" },
                      { value: "Baixa", label: "Baixa" },
                    ]}
                    className="w-full! lg:w-fit!"
                  />
                )}

                {/* AREA */}
                {isLoading ? (
                  <Skeleton.Button
                    active
                    block
                    size="small"
                    style={{ height: 32 }}
                    className="w-full! md:w-38!"
                  />
                ) : (
                  <Select
                    showSearch
                    placeholder="Selecione a área"
                    style={{ width: 160 }}
                    allowClear
                    value={params.area}
                    onChange={(val) => handleFilterChange("area", val)}
                    options={[
                      { value: "Energia", label: "Energia" },
                      { value: "Refrigeração", label: "Refrigeração" },
                      { value: "Ar-condicionado", label: "Ar-condicionado" },
                      { value: "Água", label: "Água" },
                    ]}
                    className="w-full! lg:w-fit!"
                  />
                )}

                {/* PAGE SIZE */}
                {isLoading ? (
                  <Skeleton.Button
                    active
                    block
                    size="small"
                    style={{ height: 32 }}
                    className="w-full! md:w-38!"
                  />
                ) : (
                  <Select
                    placeholder="Resultados por página"
                    style={{ width: 110 }}
                    value={params.pageSize}
                    onChange={(val) => handleFilterChange("pageSize", val)}
                    options={[
                      { value: 10, label: "10 por página" },
                      { value: 20, label: "20 por página" },
                      { value: 50, label: "50 por página" },
                    ]}
                    className="w-full! lg:w-fit!"
                  />
                )}
              </div>
            </div>

            {/* TICKETS COUNT */}
            {isLoading ? (
              <Skeleton.Button
                block
                active
                style={{ height: 32 }}
                className="w-full! md:w-44! ml-auto md:hidden"
              />
            ) : (
              <span className="text-sm ml-auto md:hidden">
                Total de chamados:{" "}
                <span className="font-semibold">{ticketsCount}</span>
              </span>
            )}
          </>
        )}
      </div>

      {/* ERROR STATE - TICKETS TABLE */}
      {isTechnicalView ? (
        isError || forceError ? (
          <Result
            status="error"
            title="Falha na sincronização"
            subTitle="Ocorreu um erro ao buscar dados atualizados, por favor, clique abaixo para tentar novamente."
            extra={
              <Button
                onClick={() => {
                  setForceError(false);
                  refetch();
                }}
                variant="outlined"
                icon={<ArrowsClockwiseIcon weight="duotone" />}
              >
                Recarregar dados
              </Button>
            }
          />
        ) : isLoading ? (
          <div className="bg-white dark:bg-neutral-900 p-6 shadow-sm rounded-3xl">
            <Skeleton.Button active block style={{ height: 600 }} />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={forceEmpty ? [] : data?.tickets}
            rowKey="id"
            loading={isLoading}
            pagination={{
              current: params.page,
              pageSize: params.pageSize,
              total: forceEmpty ? 0 : data?.total,
              showSizeChanger: false,
              showTotal: (total) => (
                <div className="flex items-center gap-3 mr-auto mt-1">
                  <span className="text-xs uppercase mr-2">
                    VERIFICAÇÃO DE ESTADOS:
                  </span>

                  <Button
                    size="small"
                    danger={!forceError}
                    type={forceError ? "primary" : "default"}
                    onClick={() => setForceError(!forceError)}
                    className="text-[10px] h-7"
                  >
                    {forceError ? "Sair do Erro" : "Forçar Erro"}
                  </Button>
                  <Button
                    size="small"
                    type={forceEmpty ? "primary" : "default"}
                    onClick={() => setForceEmpty(!forceEmpty)}
                    className="text-[10px] h-7"
                  >
                    {forceEmpty ? "Mostrar Dados" : "Forçar Vazio"}
                  </Button>

                  <span className="ml-4 italic text-xs hidden md:flex opacity-50">
                    Número de chamados encontrados: {total}
                  </span>
                </div>
              ),
            }}
            onChange={handleTableChange}
            onRow={(record) => ({
              onClick: () => {
                setSelectedTicket(record);
                setIsDrawerOpen(true);
              },
              className: "cursor-pointer hover:bg-gray-50 transition-colors",
            })}
            locale={{
              emptyText: (
                <Result
                  status="info"
                  title="Nenhum resultado para sua busca"
                  subTitle="Não encontramos chamados com os filtros atuais. Experimente ajustar os termos de pesquisa ou remover alguns filtros."
                />
              ),
              triggerAsc: "Clique para ordenar em ordem crescente.",
              triggerDesc: "Clique para ordenar em ordem decrescente.",
              cancelSort: "Clique para cancelar a ordenação.",
            }}
            className="shadow-sm rounded-3xl overflow-hidden"
            scroll={{ x: 1000 }}
          />
        )
      ) : (
        <TicketsDashboard
          tickets={forceEmpty ? [] : data?.tickets || []}
          isLoading={isLoading}
        />
      )}

      {/* TICKET DETAILS DRAWER */}
      <TicketDetailsDrawer
        selectedTicket={selectedTicket}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      {/* NEW TICKET MODAL */}
      <NewTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => refetch()}
      />
    </div>
  );
};
