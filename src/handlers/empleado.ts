import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Empleado from "../models/Empleado.model";

export const getEmpleado = async (req: Request, res: Response) => {
  try {
    const empleados = await Empleado.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: empleados });
  } catch (error) {
    console.log(error);
  }
};

export const getEmpleadoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const empleado = await Empleado.findByPk(id);

    if (!empleado) {
      return res.status(404).json({
        error: "Empleado no encontrado",
      });
    }
    res.json({ data: empleado });
  } catch (error) {
    console.log(error);
  }
};

export const createEmpleado = async (req: Request, res: Response) => {
  try {
    const empleado = await Empleado.create(req.body);
    res.status(201).json({ data: empleado });
  } catch (error) {
    console.log(error);
  }
};

export const updateEmpleado = async (req: Request, res: Response) => {
  const { id } = req.params;
  const empleado = await Empleado.findByPk(id);

  if (!empleado) {
    return res.status(404).json({
      error: "Empleado no encontrado",
    });
  }

  empleado.update(req.body);
  empleado.save();
  res.json({ data: empleado });
};

export const deleteEmpleado = async (req: Request, res: Response) => {
  const { id } = req.params;
  const empleado = await Empleado.findByPk(id);

  if (!empleado) {
    return res.status(404).json({
      error: "Empleado no encontrado",
    });
  }

  await empleado.destroy();
  res.json({ data: "Empleado Eliminado" });
};
