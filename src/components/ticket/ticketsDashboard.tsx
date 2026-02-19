"use client";
//#region Imports
import { Card, Skeleton } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { Ticket } from "@/src/lib/types/tickets";
import {
  CheckCircleIcon,
  TicketIcon,
  CaretDoubleUpIcon,
} from "@phosphor-icons/react";
import { cn } from "@/src/lib/utils/utils";
import { TicketPriority, TicketStatus } from "@/src/lib/constants/tickets";
import { priorityMap, statusMap } from "@/src/lib/constants/maps";
//#endregion

//#region Interfaces
interface DashboardProps {
  tickets: Ticket[];
  isLoading: boolean;
}

interface GenericChartData {
  name: string;
  value: number;
  fill?: string;
}
//#endregion

export const TicketsDashboard = ({ tickets, isLoading }: DashboardProps) => {
  //#region Constants
  const AREA_CHART_COLORS = [
    "#0d9488",
    "#4f46e5",
    "#7c3aed",
    "#0891b2",
    "#475569",
    "#65a30d",
  ];
  //#endregion

  //#region Filters
  const areaData = tickets.reduce<GenericChartData[]>((acc, ticket) => {
    const existing = acc.find((item) => item.name === ticket.area);
    if (existing) {
      existing.value++;
    } else {
      acc.push({
        name: ticket.area,
        value: 1,
        fill: AREA_CHART_COLORS[acc.length % AREA_CHART_COLORS.length],
      });
    }
    return acc;
  }, []);

  const STATUS_COLORS: Record<string, string> = {
    blue: "#3b82f6",
    orange: "#f59e0b",
    green: "#10b981",
    red: "#ef4444",
  };

  const statusData = tickets.reduce<GenericChartData[]>((acc, ticket) => {
    const existing = acc.find((item) => item.name === ticket.status);

    if (existing) {
      existing.value++;
    } else {
      const config = statusMap[ticket.status as TicketStatus];

      acc.push({
        name: ticket.status,
        value: 1,
        fill: config ? STATUS_COLORS[config.color] : "#94a3b8",
      });
    }
    return acc;
  }, []);

  const priorityData = tickets.reduce<GenericChartData[]>((acc, ticket) => {
    const existing = acc.find((item) => item.name === ticket.prioridade);

    if (existing) {
      existing.value++;
    } else {
      const config = priorityMap[ticket.prioridade as TicketPriority];

      acc.push({
        name: ticket.prioridade,
        value: 1,
        fill: config ? config.color : "#999999",
      });
    }
    return acc;
  }, []);
  //#endregion

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* TICKETS COUNT - CRITICAL COUNT - RESOLVED COUNT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {[
          {
            title: "Total de Chamados",
            value: tickets.length,
            icon: (
              <TicketIcon size={200} weight="duotone" className="opacity-10" />
            ),
            border: "border-l-blue-500!",
          },
          {
            title: "Prioridade Crítica",
            value: tickets.filter((t) => t.prioridade === "Crítica").length,
            icon: (
              <CaretDoubleUpIcon
                size={200}
                weight="duotone"
                className="opacity-10"
              />
            ),
            border: "border-l-red-500!",
          },
          {
            title: "Resolvidos",
            value: tickets.filter((t) => t.status === "Resolvido").length,
            icon: (
              <CheckCircleIcon
                size={200}
                weight="duotone"
                className="opacity-10"
              />
            ),
            border: "border-l-emerald-500!",
          },
        ].map((kpi, idx) =>
          isLoading ? (
            <Skeleton.Button
              block
              active
              style={{ height: 120 }}
              className="w-full!"
              key={idx}
            />
          ) : (
            <div key={idx}>
              <Card
                className={cn(
                  "rounded-3xl! border border-l-8! shadow-sm bg-white overflow-hidden relative h-full",
                  kpi.border,
                )}
              >
                {/* TITLE - VALUE */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  {/* TITLE - VALUE */}
                  <div>
                    {/* TITLE */}
                    <span className="text-[10px] uppercase tracking-widest font-bold leading-none">
                      {kpi.title}
                    </span>

                    {/* VALUE */}
                    <div className={`mt-2 text-4xl font-black  tabular-nums`}>
                      {kpi.value}
                    </div>
                  </div>
                </div>

                {/* ICON */}
                <div className="absolute -right-4 -bottom-4 z-0 transform rotate-12">
                  {kpi.icon}
                </div>
              </Card>
            </div>
          ),
        )}
      </div>

      {/* AREA CHART - PRIORITY CHART - STATUS CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* AREA CHART */}
        {isLoading ? (
          <Skeleton.Button
            block
            active
            style={{ height: 470 }}
            className="w-full!"
          />
        ) : (
          <div>
            <Card
              title={<span className="font-semibold">Demanda por Área</span>}
              className="rounded-3xl! border-none shadow-sm h-full"
            >
              <div className="h-87.5 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={areaData}
                    margin={{ left: -20, right: 10, top: 10, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <Tooltip
                      cursor={{ fill: "#f8fafc" }}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={45} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}

        {/* PRIORITY CHART */}
        {isLoading ? (
          <Skeleton.Button
            block
            active
            style={{ height: 470 }}
            className="w-full!"
          />
        ) : (
          <div>
            <Card
              title={
                <span className="font-semibold">Volume por Prioridade</span>
              }
              className="rounded-3xl! border-none shadow-sm h-full"
            >
              <div className="h-87.5 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priorityData} margin={{ top: 20 }}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: "#f8fafc" }}
                      contentStyle={{ borderRadius: "8px", border: "none" }}
                    />
                    <Bar
                      dataKey="value"
                      radius={4}
                      barSize={40}
                      label={{ position: "top", fill: "#94a3b8", fontSize: 12 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}

        {/* STATUS CHART */}
        {isLoading ? (
          <Skeleton.Button
            block
            active
            style={{ height: 470 }}
            className="w-full!"
          />
        ) : (
          <div>
            <Card
              title={<span className="font-semibold">Status da Operação</span>}
              className="rounded-3xl! border-none shadow-sm h-full"
            >
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={6}
                      dataKey="value"
                      stroke="none"
                    />
                    <Tooltip />
                    <Legend
                      verticalAlign="middle"
                      align="right"
                      layout="vertical"
                      iconType="circle"
                      wrapperStyle={{ paddingLeft: "40px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
