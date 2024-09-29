import QueryBuilder from "../../builder/QueryBuilder";
import { IAnyObject } from "../../interface/error";
import ISlot from "./slot.interface";
import Slot from "./slot.model";
import { minutesToTime, timeToMinutes } from "./slot.utils";

const createSlot = async (payload: ISlot, duration: number) => {
  // {
  //     "service": "60d9c4e4f3b4b544b8b8d1c5",
  //     "date": "2024-06-15",
  //     "startTime": "09:00",
  //     "endTime": "14:00"
  // }
  console.log(payload);

  const startMinutes = timeToMinutes(payload.startTime);
  const endMinutes = timeToMinutes(payload.endTime);

  const totalDuration = endMinutes - startMinutes;
  const numberOfSlots = totalDuration / duration;

  const slots = [];
  let start = startMinutes;
  for (let i = 0; i < numberOfSlots; i++) {
    const end = start + duration;
    slots.push({
      service: payload.service,
      date: payload.date,
      startTime: minutesToTime(start),
      endTime: minutesToTime(end),
      isBooked: "available",
    });
    start = end;
  }

  const result = await Slot.create(slots);
  return result;
};

const getAllAvailableSlotsService = async (query: IAnyObject) => {
  const find = Slot.find().populate("service");
  const queryBuilder = new QueryBuilder(find, query).filter();
  const result = await queryBuilder.modelQuery;
  return result;
};
const getAllSlotsService = async (query: IAnyObject) => {
  const find = Slot.find().sort("-createdAt").populate("service");
  const queryBuilder = new QueryBuilder(find, query).filter().paginate();
  const totalDoc = await queryBuilder.count();
  const result = await queryBuilder.modelQuery;
  return { result, totalDoc: totalDoc.totalCount };
};
const getSlotByIdService = async (id: string) => {
  const result = await Slot.findById(id).populate("service");

  return result;
};
const toggleSlotsStatusService = async (id: string) => {
  const slot = await Slot.findById(id);
  if (!slot) return null;
  const oldStatus = slot.isBooked;
  if (oldStatus === "booked") {
    return null;
  }

  const newStatus = oldStatus === "available" ? "cancel" : "available";
  const result = await Slot.findByIdAndUpdate(id, {
    $set: { isBooked: newStatus },
  });

  return result;
};

const slotService = {
  createSlot,
  getAllAvailableSlotsService,
  getSlotByIdService,
  getAllSlotsService,
  toggleSlotsStatusService,
};

export default slotService;
