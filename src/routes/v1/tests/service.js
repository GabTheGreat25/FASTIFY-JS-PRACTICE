import model from "./model.js";
import testChildModel from "../testsChild/model.js";

async function getAll() {
  return await model.find({ deleted: false });
}

async function getAllDeleted() {
  return await model.find({ deleted: true });
}

async function getById(id) {
  return await model.findOne({ _id: id, deleted: false });
}

async function add(data) {
  return await model.create(data);
}

async function update(id, data) {
  return await model.findByIdAndUpdate(_id, body, {
    new: true,
    runValidators: true,
  });
}

async function deleteById(_id) {
  return Promise.all([
    testChildModel.updateMany({ test: _id }, { deleted: true }),
  ]).then(() => model.findByIdAndUpdate(_id, { deleted: true }));
}

async function restoreById(_id) {
  return Promise.all([
    testChildModel.updateMany({ test: _id }, { deleted: false }),
  ]).then(() => model.findByIdAndUpdate(_id, { deleted: false }));
}

async function forceDelete(_id) {
  return Promise.all([testChildModel.deleteMany({ test: _id })]).then(() =>
    model.findByIdAndDelete(_id),
  );
}

export default {
  getAll,
  getAllDeleted,
  getById,
  add,
  update,
  deleteById,
  restoreById,
  forceDelete,
};
