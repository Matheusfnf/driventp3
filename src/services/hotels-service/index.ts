import { notFoundError, paymentRequiredError } from "@/errors";
import { ApplicationError } from "@/protocols";
import hotelRepository from "@/repositories/hotels-repository";

async function getHotels(userId: number) {
  await verifyHotel(userId);

  const allhotels = await hotelRepository.findHotels();

  if (!allhotels.length) throw notFoundError();

  return allhotels;
}

async function getSpecificHotel(hotelId: number, userId: number) {
  await verifyHotel(userId);

  const allhotel = await hotelRepository.findOneHotel(hotelId);
  if (!allhotel) throw notFoundError();

  return allhotel;
}

async function verifyHotel(userId: number): Promise<void | ApplicationError> {
  const PaidExisted = await hotelRepository.findPaidUserTicket(userId);

  if (!PaidExisted) throw notFoundError();

  const isRemote = PaidExisted.TicketType.isRemote;
  const notPaid = PaidExisted.status !== "PAID";
  const notIncludesHotel = !PaidExisted.TicketType.includesHotel;

  if (notPaid || notIncludesHotel || isRemote) throw paymentRequiredError();
}

const hotelService = {
  getHotels,
  getSpecificHotel,
};

export default hotelService;
