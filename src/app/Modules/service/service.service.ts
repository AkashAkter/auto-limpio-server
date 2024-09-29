/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/QueryBuilder";
import IService from "./service.interface";
import Service from "./service.model";

const createService = async (payload: IService) => {
  const result = await Service.create(payload);
  return result;
};

const getAllServiceName = async () => {
  const result = await Service.find({ isDeleted: false }).select("name");
  return result;
};

const getSingleService = async (id: string) => {
  const result = await Service.findById(id);
  return result;
};

const getAllServices = async (query: Record<string, unknown>) => {
  const { min, max } = query;

  const minPrice = min ? parseInt(min as string) : 0;
  const maxPrice = max ? parseInt(max as string) : 0;
  const filter: Record<string, any> = { isDeleted: false };

  if (minPrice && maxPrice) {
    filter.price = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice) {
    filter.price = { $gte: minPrice };
  } else if (maxPrice) {
    filter.price = { $lte: maxPrice };
  }

  const queryModel = Service.find(filter);
  const queryBuild = new QueryBuilder(queryModel, query)
    .paginate()
    .sort()
    .search(["name"]);

  const total = await queryBuild.count();

  const result = await queryBuild.modelQuery;

  return { result, totalDoc: total.totalCount };
};

const updateSingleService = async (id: string, payload: Partial<IService>) => {
  const result = await Service.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteSingleService = async (id: string) => {
  const result = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};
const servicesService = {
  createService,
  getSingleService,
  getAllServices,
  updateSingleService,
  deleteSingleService,
  getAllServiceName,
};

export default servicesService;
