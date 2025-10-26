import { Request, Response } from "express";
import Articulo from "../models/Articulos.model";

export const getArticulos = async (req: Request, res: Response) => {
  try {
    const articulos = await Articulo.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: articulos });
  } catch (error) {
    console.log(error);
  }
};

export const getArticulosById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const articulo = await Articulo.findByPk(id);
    if (!articulo) {
      res.status(404).json({
        error: "Artículo no encontrado",
      });
    }
    res.json({ data: articulo });
  } catch (error) {
    console.log(error);
  }
};

export const createArticulo = async (req: Request, res: Response) => {
  try {
    const articulo = await Articulo.create(req.body);
    res.status(201).json({ data: articulo });
  } catch (error) {
    console.log();
  }
};

export const updateArticulo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const articulo = await Articulo.findByPk(id);
  if (!articulo) {
    res.status(404).json({
      error: "Artículo no encontrado",
    });
  }

  articulo.update(req.body);
  articulo.save();

  res.json({ data: articulo });
};

export const deleteArticulo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const articulo = await Articulo.findByPk(id);

  if (!articulo) {
    return res.status(404).json({
      error: "Articulo no encontrado",
    });
  }

  await articulo.destroy();
  res.json({ data: "Artículo Eliminado" });
};
