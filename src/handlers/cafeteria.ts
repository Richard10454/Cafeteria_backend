import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Cafereria from "../models/Cafeteria.model";

export const getCafeterias = async (req: Request, res: Response) => {
  try {
    const cafeterias = await Cafereria.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: cafeterias });
  } catch (error) {
    console.log(error);
  }
};

export const getCafeteriasById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cafeteria = await Cafereria.findByPk(id);

    if (!cafeteria) {
      return res.status(404).json({
        error: "Cafetería no encontrada",
      });
    }

    res.json({ data: cafeteria });
  } catch (error) {
    console.log(error);
  }
};

export const createCafeteria = async (req: Request, res: Response) => {
  try {
    const cafeteria = await Cafereria.create(req.body);
    res.status(201).json({ data: cafeteria });
  } catch (error) {
    console.log(error);
  }
};

export const updateCafeteria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cafeteria = await Cafereria.findByPk(id);

  if (!cafeteria) {
    return res.status(404).json({
      error: "Cafetería no encontrada",
    });
  }

  await cafeteria.update(req.body);
  await cafeteria.save();

  res.json({ data: cafeteria });
};

export const deleteCafeteria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cafeteria = await Cafereria.findByPk(id);

  if (!cafeteria) {
    return res.status(404).json({
      error: "Cafereria no encontrado",
    });
  }

  await cafeteria.destroy();
  res.json({ data: "Cafetería Eliminada" });
};
