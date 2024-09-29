import { isValidObjectId } from "mongoose";
import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import Service from "./service.model";
import servicesService from "./service.service";

const {
  createService,
  getSingleService,
  getAllServices,
  updateSingleService,
  deleteSingleService,
  getAllServiceName,
} = servicesService;

export const createServiceIntoDB = catchAsyncError(async (req, res) => {
  const { body } = req;
  const result = await createService(body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service created successfully",
    data: result,
  });
});

export const getAllServiceNames = catchAsyncError(async (req, res) => {
  const result = await getAllServiceName();
  sendResponse(res, {
    message: "Successfully get all service names",
    data: result,
    statusCode: 200,
    success: true,
  });
});

export const getServiceById = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    return sendResponse(res, {
      message: "Invalid object id",
      data: null,
      statusCode: 400,
      success: false,
    });
  }

  const result = await getSingleService(id);
  if (!result) {
    sendResponse(res, {
      message: "No data found",
      data: null,
      success: false,
      statusCode: 404,
    });
  }

  sendResponse(res, {
    data: result,
    success: true,
    statusCode: 200,
    message: "Service retrieved successfully",
  });
});

export const getAllServiceFromDB = catchAsyncError(async (req, res) => {
  const result = await getAllServices(req.query);
  if (result.result.length > 0) {
    return res.json({
      success: true,
      statusCode: 200,
      message: "Services retrieved successfully",
      data: result.result,
      totalDoc: result.totalDoc,
    });
  }
  res.json({
    success: false,
    statusCode: 404,
    message: "No Data Found",
    data: [],
    totalDoc: 0,
  });
});

export const updateServiceById = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const { body } = req;
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    return sendResponse(res, {
      message: "Invalid object id",
      data: null,
      statusCode: 400,
      success: false,
    });
  }
  const isExist = Service.findById(id);
  if (!isExist) {
    return sendResponse(res, {
      message: "Service not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  const result = await updateSingleService(id, body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service updated successfully",
    data: result,
  });
});
export const deleteServiceById = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    return sendResponse(res, {
      message: "Invalid object id",
      data: null,
      statusCode: 400,
      success: false,
    });
  }
  const isExist = Service.findById(id);
  if (!isExist) {
    return sendResponse(res, {
      message: "Service not found",
      data: null,
      statusCode: 404,
      success: false,
    });
  }

  const result = await deleteSingleService(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service updated successfully",
    data: result,
  });
});
