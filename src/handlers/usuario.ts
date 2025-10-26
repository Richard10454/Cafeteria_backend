import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.model";

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: usuarios });
  } catch (error) {
    console.log(error);
  }
};

export const getUsuariosById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }
    res.json({ data: usuario });
  } catch (error) {
    console.log(error);
  }
};

export const createUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json({ data: usuario });
  } catch (error) {
    console.log();
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return res.status(404).json({
      error: "Usuario no encontrado",
    });
  }

  usuario.update(req.body);
  usuario.save();
  res.json({ data: usuario });
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return res.status(404).json({
      error: "Usuario no encontrado",
    });
  }

  await usuario.destroy();
  res.json({ data: "Usuario Eliminado" });
};
