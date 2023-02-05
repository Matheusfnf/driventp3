import { Router } from "express";
import { getHotelsById, getUniqueHotels } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const hotelsRouter = Router();

hotelsRouter.all("/*", authenticateToken).get("/", getUniqueHotels).get("/:hotelId", getHotelsById);

export { hotelsRouter };
