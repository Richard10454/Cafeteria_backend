import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Proveedor from "../models/Proveedor.model";

export const getProveedor = async (req: Request, res: Response) => {
  try {
    const proveedores = await Proveedor.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: proveedores });
  } catch (error) {
    console.log(error);
  }
};

export const getProveedorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const proveedor = await Proveedor.findByPk(id);

    if (!proveedor) {
      return res.status(400).json({
        error: "Proveedor no encontrado",
      });
    }
    res.json({ data: proveedor });
  } catch (error) {
    console.log(error);
  }
};

export const createProveedor = async (req: Request, res: Response) => {
  try {
    const provedor = await Proveedor.create(req.body);
    res.status(201).json({ data: provedor });
  } catch (error) {
    console.log(error);
  }
};

export const updateProveedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const proveedor = await Proveedor.findByPk(id);

  if (!proveedor) {
    return res.status(400).json({
      error: "Proveedor no encontrado",
    });
  }

  proveedor.update(req.body);
  proveedor.save();
  res.json({ data: proveedor });
};

export const deleteProveedor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const proveedor = await Proveedor.findByPk(id);

  if (!proveedor) {
    return res.status(404).json({
      error: "Proveedor no encontrado",
    });
  }

  await proveedor.destroy();
  res.json({ data: "Proveedor Eliminado" });
};
