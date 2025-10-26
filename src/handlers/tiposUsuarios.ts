import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import TiposUsuarios from "../models/TiposUsuarios.model";
import { json } from "sequelize";

export const getTipoUsuario = async (req: Request, res: Response) => {
  try {
    const tiposUsuarios = await TiposUsuarios.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: tiposUsuarios });
  } catch (error) {
    console.log(error);
  }
};

export const getTipoUsuarioById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tiposUsuario = await TiposUsuarios.findByPk(id);

    if (!tiposUsuario) {
      return res.status(404).json({
        error: "Tipo de Usuario no encontrado",
      });
    }
    res.json({ data: tiposUsuario });
  } catch (error) {
    console.log(error);
  }
};

export const createTiposUsuarios = async (req: Request, res: Response) => {
  try {
    const tiposUsuarios = await TiposUsuarios.create(req.body);
    res.status(201).json({ data: tiposUsuarios });
  } catch (error) {
    console.log(error);
  }
};

export const updateTiposUsuarios = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tiposUsuario = await TiposUsuarios.findByPk(id);

  if (!tiposUsuario) {
    return res.status(404).json({
      error: "Tipo de Usuario no encontrado",
    });
  }

  tiposUsuario.update(req.body);
  tiposUsuario.save();
  res.json({ data: tiposUsuario });
};

export const deleteTiposUsuarios = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tiposUsuario = await TiposUsuarios.findByPk(id);

  if (!tiposUsuario) {
    return res.status(404).json({
      error: "Tipo de Usuario no encontrado",
    });
  }

  await tiposUsuario.destroy();
  res.json({ data: "Tipo de Usuario Eliminado" });
};
