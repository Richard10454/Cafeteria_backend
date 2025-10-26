import { Request, Response } from "express";
import Facturacion from "../models/Facturacion.model";

export const getFacturacion = async (req: Request, res: Response) => {
  try {
    const facturas = await Facturacion.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: facturas });
  } catch (error) {
    console.log(error);
  }
};

export const getFacturacionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const factura = await Facturacion.findByPk(id);

    if (!factura) {
      return res.status(404).json({
        error: "Factura no encontrada",
      });
    }
    res.json({ data: factura });
  } catch (error) {
    console.log(error);
  }
};

export const createFacturacion = async (req: Request, res: Response) => {
  try {
    const facturacion = await Facturacion.create(req.body);
    res.status(201).json({ data: facturacion });
  } catch (error) {
    console.log(error);
  }
};

export const updateFacturacion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const factura = await Facturacion.findByPk(id);

  if (!factura) {
    return res.status(404).json({
      error: "Factura no encontrada",
    });
  }

  factura.update(req.body);
  factura.save();
  res.json({ data: factura });
};

export const deleteFacturacion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const facturacion = await Facturacion.findByPk(id);

  if (!facturacion) {
    return res.status(404).json({
      error: "Facturacion no encontrado",
    });
  }

  await facturacion.destroy();
  res.json({ data: "Campus Eliminado" });
};
