import service from "./service.js";
import createError from "http-errors";
import { STATUSCODE } from "../../../constants/index.js";
import { responseHandler, multipleImages } from "../../../utils/index.js";

const getAllTestsChild = async (req, reply) => {
  const data = await service.getAll();

  responseHandler(
    req,
    reply,
    data,
    data?.length === STATUSCODE.ZERO
      ? "No Tests Child found"
      : "All Tests Child retrieved successfully",
  );
};

const getAllTestsChildDeleted = async (req, reply) => {
  const data = await service.getAllDeleted();

  responseHandler(
    req,
    reply,
    data,
    data?.length === STATUSCODE.ZERO
      ? "No Deleted Tests Child found"
      : "All Deleted Tests Child retrieved successfully",
  );
};

const getSingleTestChild = async (req, reply) => {
  const data = await service.getById(req.params.id);

  responseHandler(
    req,
    reply,
    data,
    !data ? "No Test Child found" : "Test Child retrieved successfully",
  );
};

const createNewTestChild = async (req, reply) => {
  const uploadedImages = await multipleImages(req.files, []);

  if (uploadedImages.length === STATUSCODE.ZERO)
    throw createError(STATUSCODE.BAD_REQUEST, "Image is required");

  const data = await service.add({
    ...req.body,
    image: uploadedImages,
  });

  responseHandler(req, reply, [data], "Test Child created successfully");
};

const updateTestChild = async (req, reply) => {
  const oldData = await service.getImageById(req.params.id);

  const uploadNewImages = await multipleImages(
    req.files,
    oldData?.image.map((image) => image.public_id) || [],
  );

  const data = await service.update(req.params.id, {
    ...req.body,
    image: uploadNewImages,
  });

  responseHandler(req, reply, [data], "Test Child updated successfully");
};

const deleteTestChild = async (req, reply) => {
  const data = await service.deleteById(req.params.id);

  responseHandler(
    req,
    reply,
    data?.deleted ? [] : [data],
    data?.deleted
      ? "Test Child is already deleted"
      : "Test Child deleted successfully",
  );
};

const restoreTestChild = async (req, reply) => {
  const data = await service.restoreById(req.params.id);

  responseHandler(
    req,
    reply,
    !data?.deleted ? [] : data,
    !data?.deleted
      ? "Test child is not deleted"
      : "Test child restored successfully",
  );
};

const forceDeleteTestChild = async (req, reply) => {
  const data = await service.forceDelete(req.params.id);

  const message = !data
    ? "No Test Child found"
    : "Test Child force deleted successfully";

  await multipleImages(
    [],
    data?.image ? data.image.map((image) => image.public_id) : [],
  );

  responseHandler(req, reply, data, message);
};

export {
  getAllTestsChild,
  getAllTestsChildDeleted,
  getSingleTestChild,
  createNewTestChild,
  updateTestChild,
  deleteTestChild,
  restoreTestChild,
  forceDeleteTestChild,
};
