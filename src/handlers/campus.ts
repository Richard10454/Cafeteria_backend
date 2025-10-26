import { Request, Response } from "express";
import Campus from "../models/Campus.model";

export const getCampus = async (req: Request, res: Response) => {
  try {
    const campus = await Campus.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: campus });
  } catch (error) {
    console.log(error);
  }
};

export const getCampusById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campus = await Campus.findByPk(id);

    if (!campus) {
      return res.status(404).json({
        error: "Campus no encontrado",
      });
    }

    res.json({ data: campus });
  } catch (error) {
    console.log(error);
  }
};

export const createCampus = async (req: Request, res: Response) => {
  try {
    const campus = await Campus.create(req.body);
    res.status(201).json({ data: campus });
  } catch (error) {
    console.log(error);
  }
};

export const updateCampus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const campus = await Campus.findByPk(id);

  if (!campus) {
    return res.status(404).json({
      error: "Campus no encontrado",
    });
  }

  //Actualizar
  await campus.update(req.body);
  await campus.save();

  res.json({ data: campus });
};

export const deleteCampus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const campus = await Campus.findByPk(id);

  if (!campus) {
    return res.status(404).json({
      error: "Campus no encontrado",
    });
  }

  await campus.destroy();
  res.json({ data: "Campus Eliminado" });
};
