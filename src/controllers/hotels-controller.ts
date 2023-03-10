import httpStatus from "http-status";
import hotelService from "@/services/hotels-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";

export async function getUniqueHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const allhotels = await hotelService.getHotels(+userId);

    return res.status(httpStatus.OK).send(allhotels);
  } catch (error) {
    if (error.name === "PaymentRequiredError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getHotelsById(req: AuthenticatedRequest, res: Response) {
  const {
    userId,
    params: { hotelId },
  } = req;

  try {
    const hotels = await hotelService.getSpecificHotel(+hotelId, userId);

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "PaymentRequiredError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
