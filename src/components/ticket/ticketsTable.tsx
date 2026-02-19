"use client";
//#region Imports
import { useEffect, useState } from "react";
import { Table, Input, Select, Button, Result } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { Ticket } from "@/src/lib/types/tickets";
import { TicketsFilters, useTicketsList } from "@/src/lib/hooks/useTicketsList";
import {
  TicketArea,
  TicketPriority,
  TicketStatus,
} from "@/src/lib/constants/tickets";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PlusCircleIcon } from "@phosphor-icons/react";
import TicketDetailsDrawer from "@/src/components/ticket/ticketDetailsDrawer";
import PageTitle from "@/src/components/common/pageTitle";
import { StatusLabel } from "@/src/components/common/statusLabel";
import { PriorityLabel } from "@/src/components/common/priorityLabel";
const { Search } = Input;
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
  const getInitialParams = (): TicketsFilters => ({
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
    text: searchParams.get("text") || "",
    status: (searchParams.get("status") as TicketStatus) || undefined,
    priority: (searchParams.get("priority") as TicketPriority) || undefined,
    area: (searchParams.get("area") as TicketArea) || undefined,
  });
  //#endregion

  //#region useStates
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [params, setParams] = useState<TicketsFilters>(getInitialParams());
  //#endregion

  //#region Hooks
  const { data, isLoading, isError, refetch } = useTicketsList(params);
  //#endregion

  //#region useEffects
  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    let hasChanged = false;

    Object.entries(params).forEach(([key, value]) => {
      const stringValue =
        value !== undefined && value !== null ? String(value) : "";
      if (current.get(key) !== stringValue && stringValue !== "") {
        current.set(key, stringValue);
        hasChanged = true;
      } else if (stringValue === "" && current.has(key)) {
        current.delete(key);
        hasChanged = true;
      }
    });

    if (hasChanged) {
      router.push(`${pathname}?${current.toString()}`, { scroll: false });
    }
  }, [params, pathname, router, searchParams]);
  //#endregion

  //#region Handle functions
  /**
   * Handles a change in a filter for the DataTable component.
   *
   * @param {keyof TicketsFilters} key The key of the filter to be changed.
   * @param {TicketsFilters[keyofTicketsFilters]} value The new value of the filter.
   *
   * Resets the page number to 1 and updates the params state with the new filter value.
   */
  const handleFilterChange = <K extends keyof TicketsFilters>(
    key: K,
    value: TicketsFilters[K],
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
          />

          {/* ADD TICKET BUTTON */}
          <Button
            size="large"
            variant="solid"
            color="primary"
            icon={<PlusCircleIcon />}
            className="w-full md:w-fit"
          >
            Novo chamado
          </Button>
        </div>

        {/* FILTER (SEARCH (TEXT INPUT) | STATUS | PRIORITY | AREA | PAGE SIZE) */}
        <div className="flex flex-col lg:flex-row items-center w-full justify-between gap-5">
          {/* SEARCH (TEXT INPUT) */}
          <Search
            placeholder="Pesquise por título..."
            onSearch={(value) => handleFilterChange("text", value)}
            defaultValue={params.text}
            className="w-full lg:max-w-md"
            allowClear
          />

          {/* FILTERS (STATUS | PRIORITY | AREA | PAGE SIZE) */}
          <div className="grid grid-cols-2 lg:flex lg:flex-row gap-5 w-full lg:w-fit">
            {/* STATUS */}
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

            {/* PRIORITY */}
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

            {/* AREA */}
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

            {/* PAGE SIZE */}
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
          </div>
        </div>

        {/* TICKETS COUNT */}
        <span className="text-sm ml-auto">
          Total de chamados:{" "}
          <span className="font-semibold">{ticketsCount}</span>
        </span>
      </div>

      {/* ERROR STATE - TICKETS TABLE */}
      {isError ? (
        // ERROR STATE
        <Result
          status="error"
          title="Erro na busca de dados"
          extra={
            <Button type="primary" onClick={() => refetch()}>
              Tentar Novamente
            </Button>
          }
        />
      ) : (
        // TICKETS TABLE
        <Table
          columns={columns}
          dataSource={data?.tickets}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: params.page,
            pageSize: params.pageSize,
            total: data?.total,
            showSizeChanger: false,
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
            emptyText: "Nenhum chamado encontrado",
            triggerAsc: "Clique para ordenar em ordem crescente.",
            triggerDesc: "Clique para ordenar em ordem decrescente.",
            cancelSort: "Clique para cancelar a ordenação.",
          }}
          className="shadow-sm rounded-3xl overflow-hidden"
          scroll={{ x: 1000 }}
        />
      )}

      {/* TICKET DETAILS DRAWER */}
      <TicketDetailsDrawer
        selectedTicket={selectedTicket}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
};
