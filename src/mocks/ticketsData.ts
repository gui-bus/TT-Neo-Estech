//#region Imports
import { fakerPT_BR as faker } from "@faker-js/faker";
import seedData from "@/src/mocks/seed.json";
import { Ticket } from "@/src/lib/types/tickets";
import {
  TICKET_AREAS,
  TICKET_PRIORIDADES,
  TICKET_STATUS,
} from "@/src/lib/constants/tickets";
//#endregion

//#region Handle functions
/**
 * Generates an array of mocked `Ticket` objects.
 *
 * The IDs are generated sequentially starting from the highest ID found
 * in `seedData` to avoid collisions with existing records.
 *
 * @param count Number of tickets to generate.
 * @returns An array of generated `Ticket` objects.
 */
const generateMockedTickets = (count: number): Ticket[] => {
  const baseID =
    seedData.length > 0
      ? Math.max(...(seedData as Ticket[]).map((t) => Number(t.id))) + 1
      : 1;

  return Array.from({ length: count }, (_, i) => ({
    id: baseID + i,
    titulo: faker.hacker.phrase(),
    area: faker.helpers.arrayElement(TICKET_AREAS),
    prioridade: faker.helpers.arrayElement(TICKET_PRIORIDADES),
    status: faker.helpers.arrayElement(TICKET_STATUS),
    equipamento: faker.commerce.productName(),
    instalacao: `Unidade ${faker.location.city()}`,
    abertura: faker.date.recent({ days: 30 }).toISOString(),
    ultimaAtualizacao: faker.date.recent({ days: 2 }).toISOString(),
    descricao: faker.lorem.paragraph(),
    responsavel: faker.person.fullName(),
    avatar: faker.image.avatar(),
  }));
};
//#endregion

export const mockedTickets: Ticket[] = [
  ...(seedData as Ticket[]),
  ...generateMockedTickets(1000),
];
