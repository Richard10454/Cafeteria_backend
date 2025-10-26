import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Marca from "../models/Marca.model";

export const getMarca = async (req: Request, res: Response) => {
  try {
    const marcas = await Marca.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: marcas });
  } catch (error) {
    console.log(error);
  }
};

export const getMarcaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const marca = await Marca.findByPk(id);

    if (!marca) {
      return res.status(404).json({
        error: "Marca no encontrada",
      });
    }
    res.json({ data: marca });
  } catch (error) {
    console.log(error);
  }
};

export const createMarca = async (req: Request, res: Response) => {
  try {
    const marca = await Marca.create(req.body);
    res.status(201).json({ data: marca });
  } catch (error) {
    console.log(error);
  }
};

export const updateMarca = async (req: Request, res: Response) => {
  const { id } = req.params;
  const marca = await Marca.findByPk(id);

  if (!marca) {
    return res.status(404).json({
      error: "Marca no encontrada",
    });
  }

  marca.update(req.body);
  marca.save();
  res.json({ data: marca });
};

export const deleteMarca = async (req: Request, res: Response) => {
  const { id } = req.params;
  const marca = await Marca.findByPk(id);

  if (!marca) {
    return res.status(404).json({
      error: "Marca no encontrado",
    });
  }

  await marca.destroy();
  res.json({ data: "Marca Eliminado" });
};
