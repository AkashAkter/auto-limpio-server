import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import Service from "../service/service.model";
import slotService from "./slot.service";

const {
  createSlot,
  getAllAvailableSlotsService,
  getSlotByIdService,
  getAllSlotsService,
  toggleSlotsStatusService,
} = slotService;

export const createSlotsIntoDB = catchAsyncError(async (req, res) => {
  const { body } = req;

  const isServiceExist = await Service.findById(body.service);

  if (!isServiceExist) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "There is no available Service on this id. invalid service id",
      data: null,
    });
  }

  const result = await createSlot(body, isServiceExist.duration);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Slots created successfully",
    data: result,
  });
});

export const getAllAvailableSlots = catchAsyncError(async (req, res) => {
  const query = req.query;
  const result = await getAllAvailableSlotsService(query);
  if (result.length > 0) {
    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Available slots retrieved successfully",
      data: result,
    });
  }
  sendResponse(res, {
    message: "No data found",
    data: [],
    success: false,
  });
});
export const getAllSlots = catchAsyncError(async (req, res) => {
  const query = req.query;
  const { result, totalDoc } = await getAllSlotsService(query);
  if (result.length > 0) {
    return res.json({
      success: true,
      data: result,
      totalDoc,
      message: "All slots retrieved successfully",
    });
  }
  sendResponse(res, {
    message: "No data found",
    data: [],
    success: false,
  });
});
export const getSlotById = catchAsyncError(async (req, res) => {
  const result = await getSlotByIdService(req.params.id);

  sendResponse(res, {
    message: "successfully get slot",
    data: result,
    success: true,
  });
});
export const toggleSlotStatus = catchAsyncError(async (req, res) => {
  const result = await toggleSlotsStatusService(req.params.id);

  if (!result) {
    return sendResponse(res, {
      data: null,
      success: false,
      message: "Slot not found",
      statusCode: 404,
    });
  }

  sendResponse(res, {
    message: "successfully updated slot status",
    data: result,
    success: true,
  });
});
