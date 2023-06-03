import { handleErrors } from "../db/errors.js";
import { postModel } from "../models/post.model.js";

const getAllPost = async (req, res) => {
  const {limit} = req.query;

  try {
    const result = await postModel.findAll(limit);
    return res.json({ ok: true, result });
  } catch (error) {
    console.log(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await postModel.findById(id);
    return res.json({ ok: true, result });
  } catch (error) {
    console.log(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
};

const createPost = async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;

  try {
    const result = await postModel.create({ titulo, img, descripcion, likes });
    return res.status(201).json({ ok: true, result, msg: "Post agregado" });
  } catch (error) {
    console.log(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await postModel.remove(id);
    return res.status(200).json({ ok: true, result: "Post eliminado" });
  } catch (error) {
    console.log(error);
    return res.json({ ok: false, result: "Post ${id} NO se a eliminado" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { titulo, img, descripcion, likes } = req.body;
  try {
    const result = await postModel.update(id, {
      titulo,
      img,
      descripcion,
      likes,
    });
    res.status(200).json({ ok: true, result: "Post Actualizado" });
  } catch (error) {
    console.log(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, result: message });
  }
};

export const postController = {
  getAllPost,
  getPost,
  createPost,
  deletePost,
  updatePost,
};
