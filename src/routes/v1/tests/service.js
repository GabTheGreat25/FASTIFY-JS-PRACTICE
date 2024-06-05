import model from "./model.js";

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
  return await model.findByIdAndUpdate(id, data, { new: true });
}

async function deleteById(id) {
  return await model.findByIdAndUpdate(id, { deleted: true });
}

async function restoreById(id) {
  return await model.findByIdAndUpdate(id, { deleted: false });
}

async function forceDelete(id) {
  return await model.findByIdAndDelete(id);
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
