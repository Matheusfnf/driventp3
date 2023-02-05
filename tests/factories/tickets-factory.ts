import faker from "@faker-js/faker";
import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

export async function TicketTypeCreated(isRemote = faker.datatype.boolean(), includesHotel = faker.datatype.boolean()) {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote,
      includesHotel,
    },
  });
}

export async function TicketCreated(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
  });
}
