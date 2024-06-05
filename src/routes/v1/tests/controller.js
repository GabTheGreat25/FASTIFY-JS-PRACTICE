import service from "./service.js";
import { STATUSCODE } from "../../../constants/index.js";
import { responseHandler } from "../../../utils/index.js";

const getAllTests = async (req, reply) => {
  const data = await service.getAll();

  responseHandler(
    req,
    reply,
    data?.length === STATUSCODE.ZERO
      ? "No Tests found"
      : "All Tests retrieved successfully",
    data
  );
};

const getAllTestsDeleted = async (req, reply) => {
  const data = await service.getAllDeleted();

  responseHandler(
    req,
    reply,
    data?.length === STATUSCODE.ZERO
      ? "No Deleted Tests found"
      : "All Deleted Tests retrieved successfully",
    data
  );
};

const getSingleTest = async (req, reply) => {
  const data = await service.getById(req.params.id);

  responseHandler(
    req,
    reply,
    !data ? "No Test found" : "Test retrieved successfully",
    data
  );
};

const createNewTest = async (req, reply) => {
  const data = await service.add(req.body);

  responseHandler(req, reply, "Test created successfully", [data]);
};

const updateTest = async (req, reply) => {
  const data = await service.update(req.params.id, req.body);

  responseHandler(req, reply, "Test updated successfully", [data]);
};

const deleteTest = async (req, reply) => {
  const data = await service.deleteById(req.params.id);

  const message = data?.deleted
    ? "Test is already deleted"
    : "Test deleted successfully";

  responseHandler(req, reply, message, data?.deleted ? [] : [data]);
};

const restoreTest = async (req, reply) => {
  const data = await service.restoreById(req.params.id);

  const message = !data?.deleted
    ? "Test is not deleted"
    : "Test restored successfully";

  responseHandler(req, reply, message, !data?.deleted ? [] : [data]);
};

const forceDeleteTest = async (req, reply) => {
  const data = await service.forceDelete(req.params.id);

  const message = !data ? "No Test found" : "Test force deleted successfully";

  responseHandler(req, reply, message, data);
};

export {
  getAllTests,
  getAllTestsDeleted,
  getSingleTest,
  createNewTest,
  updateTest,
  deleteTest,
  restoreTest,
  forceDeleteTest,
};
