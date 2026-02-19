"use client";
//#region Imports
import { Modal, Form, Input, Select, Button, App } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ticket } from "@/src/lib/types/tickets";
import { addTicketToMock } from "@/src/mocks/ticketsData";
import { faker } from "@faker-js/faker";
import { TicketArea, TicketPriority } from "@/src/lib/constants/tickets";
import { PlusIcon } from "@phosphor-icons/react";
import {
  TicketFormData,
  ticketSchema,
} from "@/src/lib/schemas/validationSchemas";
//#endregion

//#region Interfaces
interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
//#endregion

export const NewTicketModal = ({
  isOpen,
  onClose,
  onSuccess,
}: NewTicketModalProps) => {
  //#region Form
  const { message } = App.useApp();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      titulo: "",
      equipamento: "",
      descricao: "",
      area: undefined,
      prioridade: undefined,
      instalacao: "",
      responsavel: "",
    },
  });
  //#endregion

  //#region Handle functions
  const onSubmit = async (data: TicketFormData) => {
    try {
      const newTicket: Ticket = {
        ...data,
        // eslint-disable-next-line react-hooks/purity
        id: Math.floor(Math.random() * 1000) + 1,
        status: "Aberto",
        abertura: new Date().toISOString(),
        ultimaAtualizacao: new Date().toISOString(),
        responsavel: data.responsavel,
        instalacao: data.instalacao,
        area: data.area as TicketArea,
        prioridade: data.prioridade as TicketPriority,
        descricao: data.descricao || "Sem descrição",
        equipamento: data.equipamento,
        titulo: data.titulo,
        avatar: faker.image.avatar(),
      };

      addTicketToMock(newTicket);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Chamado criado com sucesso!");
      reset();
      onSuccess();
      onClose();
    } catch (error) {
      message.error("Ocorreu um erro ao criar o chamado.");
      throw error;
    }
  };
  //#endregion

  return (
    <Modal
      title="CRIAR NOVO CHAMADO"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      className="w-full! max-w-xl! p-5!"
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="mt-5!"
      >
        {/* TITLE */}
        <Form.Item
          label="Título do chamado"
          validateStatus={errors.titulo ? "error" : ""}
          help={errors.titulo?.message}
          required
        >
          <Controller
            name="titulo"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Insira o título do chamado" />
            )}
          />
        </Form.Item>

        {/* AREA - PRIORITY */}
        <div className="grid grid-cols-2 gap-4">
          {/* AREA */}
          <Form.Item
            label="Área"
            validateStatus={errors.area ? "error" : ""}
            help={errors.area?.message}
            required
          >
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  showSearch
                  placeholder="Selecione uma opção"
                  options={[
                    { value: "Energia", label: "Energia" },
                    { value: "Refrigeração", label: "Refrigeração" },
                    { value: "Ar-condicionado", label: "Ar-condicionado" },
                    { value: "Água", label: "Água" },
                  ]}
                />
              )}
            />
          </Form.Item>

          {/* PRIORITY */}
          <Form.Item
            label="Prioridade"
            validateStatus={errors.prioridade ? "error" : ""}
            help={errors.prioridade?.message}
            required
          >
            <Controller
              name="prioridade"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  showSearch
                  placeholder="Selecione uma opção"
                  options={[
                    { value: "Crítica", label: "Crítica" },
                    { value: "Alta", label: "Alta" },
                    { value: "Media", label: "Média" },
                    { value: "Baixa", label: "Baixa" },
                  ]}
                />
              )}
            />
          </Form.Item>
        </div>

        {/* EQUIPMENT - INSTALATION */}
        <div className="grid grid-cols-2 gap-4">
          {/* EQUIPMENT */}
          <Form.Item
            label="Equipamento"
            validateStatus={errors.equipamento ? "error" : ""}
            help={errors.equipamento?.message}
            required
          >
            <Controller
              name="equipamento"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Insira o nome do equipamento" />
              )}
            />
          </Form.Item>

          {/* INSTALATION */}
          <Form.Item
            label="Instalação"
            validateStatus={errors.instalacao ? "error" : ""}
            help={errors.instalacao?.message}
            required
          >
            <Controller
              name="instalacao"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Insira o local da instalação" />
              )}
            />
          </Form.Item>
        </div>

        {/* RESPONSIBLE */}
        <Form.Item
          label="Responsável"
          validateStatus={errors.responsavel ? "error" : ""}
          help={errors.responsavel?.message}
          required
        >
          <Controller
            name="responsavel"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Insira o nome do responsável" />
            )}
          />
        </Form.Item>

        {/* DESCRIPTION */}
        <Form.Item
          label="Descrição"
          validateStatus={errors.descricao ? "error" : ""}
          help={errors.descricao?.message}
        >
          <Controller
            name="descricao"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                rows={3}
                placeholder="Insira o estado atual do equipamento e quando o problema começou, ou qualquer outra informação que julgar relevante."
              />
            )}
          />
        </Form.Item>

        {/* CANCEL - SUBMIT */}
        <div className="flex justify-end gap-2 mt-6">
          {/* CANCEL */}
          <Button onClick={onClose} className="w-full">
            Cancelar
          </Button>

          {/* SUBMIT */}
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusIcon weight="duotone" />}
            loading={isSubmitting}
            className="uppercase w-full"
          >
            Criar Chamado
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
