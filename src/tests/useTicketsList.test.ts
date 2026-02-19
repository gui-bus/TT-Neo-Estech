//#region Imports
import { describe, it, expect } from 'vitest';
import { Ticket } from '@/src/lib/types/tickets';
import { processTickets, TicketParams } from '@/src/lib/hooks/useTicketsList';
//#endregion

//#region Tests
describe('Deve executar a função processTickets() do hook useTicketsList corretamente', () => {
  const mockTickets = [
    { 
      id: '1', 
      titulo: 'Erro na Refrigeração', 
      status: 'Aberto', 
      prioridade: 'Alta', 
      area: 'Refrigeração', 
      abertura: '2024-01-01' 
    },
    { 
      id: '2', 
      titulo: 'Vazamento Elétrico', 
      status: 'Resolvido', 
      prioridade: 'Baixa', 
      area: 'Energia', 
      abertura: '2024-01-02' 
    },
    { 
      id: '3', 
      titulo: 'Manutenção Preventiva', 
      status: 'Aberto', 
      prioridade: 'Média', 
      area: 'Refrigeração', 
      abertura: '2024-01-03' 
    },
  ] as unknown as Ticket[];

  it('Deve filtrar a lista de chamados corretamente e buscar apenas os chamados que contenham o texto "Vazamento".', () => {
    const params: TicketParams = { page: 1, pageSize: 10, text: 'Vazamento' };
    const result = processTickets(mockTickets, params);
    
    expect(result.total).toBe(1);
    expect(result.tickets[0].titulo).toBe('Vazamento Elétrico');
  });

  it('Deve filtrar a lista de chamados corretamente e buscar apenas os chamados com o status "Aberto".', () => {
    const params: TicketParams = { page: 1, pageSize: 10, status: 'Aberto' };
    const result = processTickets(mockTickets, params);
    
    expect(result.total).toBe(2);
    expect(result.tickets.every(t => t.status === 'Aberto')).toBe(true);
  });

  it('Deve ordenar a lista de chamados corretamente de forma decrescente com base na data de abertura.', () => {
    const params: TicketParams = { 
      page: 1, 
      pageSize: 10, 
      sortField: 'abertura', 
      sortOrder: 'descend' 
    };
    const result = processTickets(mockTickets, params);
    
    expect(result.tickets[0].id).toBe('3');
  });

  it('Deve aplicar a paginação corretamente, exibindo apenas os chamados da segunda página com um tamanho de 1 chamado por página.', () => {
    const params: TicketParams = { page: 2, pageSize: 1 };
    const result = processTickets(mockTickets, params);
    
    expect(result.tickets).toHaveLength(1);
    expect(result.total).toBe(3);
  });

  it('Deve retornar uma lista vazia após filtrar a lista de chamados corretamente e buscar apenas os chamados que contenham o texto "Sensor".', () => {
    const params: TicketParams = { page: 1, pageSize: 10, text: 'Sensor' };
    const result = processTickets(mockTickets, params);
    
    expect(result.total).toBe(0);
  })
});
//#endregion