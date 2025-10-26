import { Router } from "express";
import { body, param } from "express-validator";
import {
  createCampus,
  deleteCampus,
  getCampus,
  getCampusById,
  updateCampus,
} from "./handlers/campus";
import {
  createCafeteria,
  deleteCafeteria,
  getCafeterias,
  getCafeteriasById,
  updateCafeteria,
} from "./handlers/cafeteria";
import {
  createEmpleado,
  deleteEmpleado,
  getEmpleado,
  getEmpleadoById,
  updateEmpleado,
} from "./handlers/empleado";
import {
  createMarca,
  deleteMarca,
  getMarca,
  getMarcaById,
  updateMarca,
} from "./handlers/marca";
import {
  createProveedor,
  deleteProveedor,
  getProveedor,
  getProveedorById,
  updateProveedor,
} from "./handlers/proveedor";
import {
  createTiposUsuarios,
  deleteTiposUsuarios,
  getTipoUsuario,
  getTipoUsuarioById,
  updateTiposUsuarios,
} from "./handlers/tiposUsuarios";
import {
  createArticulo,
  deleteArticulo,
  getArticulos,
  getArticulosById,
  updateArticulo,
} from "./handlers/articulo";
import {
  createUsuario,
  deleteUsuario,
  getUsuarios,
  getUsuariosById,
  updateUsuario,
} from "./handlers/usuario";
import {
  createFacturacion,
  deleteFacturacion,
  getFacturacion,
  getFacturacionById,
  updateFacturacion,
} from "./handlers/facturacion";
import { handleInputErrorrs } from "./middleware/index";

const router = Router();

// Routing campus
router.get("/campus", getCampus);

router.get(
  "/campus/:id",

  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  getCampusById
);

router.post(
  "/campus",
  // Validacion
  body("descripcion")
    .notEmpty()
    .withMessage("La descripción del campus no puede ir vacia"),
  handleInputErrorrs,
  createCampus
);

router.put(
  "/campus/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  updateCampus
);

router.delete(
  "/campus/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  deleteCampus
);

// -------------------- Routing Cafeteria ---------------------------------
router.get("/cafeterias", getCafeterias);

router.get(
  "/cafeterias/:id",

  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  getCafeteriasById
);

router.post(
  "/cafeterias",
  //Validacion
  body("descripcion")
    .notEmpty()
    .withMessage("La descripción de la cafeteria no puede estar vacia"),

  body("encargado")
    .notEmpty()
    .withMessage("La descripción del encargado no puede estar vacia"),

  body("campusId")
    .notEmpty()
    .withMessage("Seleccionar un campus es obligatorio"),
  handleInputErrorrs,
  createCafeteria
);

router.put(
  "/cafeterias/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  updateCafeteria
);

router.delete(
  "/cafeterias/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  deleteCafeteria
);

// --------------------------- Routing articulo -----------------------------
router.get("/articulos", getArticulos);

router.get(
  "/articulos/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  getArticulosById
);

router.post(
  "/articulos",
  body("descripcion").notEmpty().withMessage("Este campo es obligatorio"),
  body("costo")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("Este campo es obligatorio")
    .custom((value) => value > 0)
    .withMessage("Costo no valido"),

  body("existencia")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("Este campo es obligatorio")
    .custom((value) => value > 0)
    .withMessage("Existencia no valida"),

  body("marcaId")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("Este campo es obligatorio"),

  body("provedorID")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("Este campo es obligatorio"),
  handleInputErrorrs,
  createArticulo
);

router.put(
  "/articulos/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  updateArticulo
);

router.delete(
  "/articulos/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  deleteArticulo
);

// ------------------------ Routing Empleado ------------------------------
router.get("/empleados", getEmpleado);

router.get(
  "/empleados/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  getEmpleadoById
);

router.post(
  "/empleados",
  body("nombre")
    .notEmpty()
    .withMessage("El nombre del empleado es obligatorio"),
  body("cedula")
    .notEmpty()
    .withMessage("La cédula del empleado es obligatoria"),
  body("tandaLabor")
    .notEmpty()
    .withMessage("La Tanda de labor del empleado es obligatoria"),
  body("porcentajeComision")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El porcentaje de comisión del empleado es obligatorio"),
  body("fechaIngreso")
    .isDate()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("La fecha de ingreso es obligatoria"),
  handleInputErrorrs,
  createEmpleado
);

router.put(
  "/empleados/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  updateEmpleado
);

router.delete(
  "/empleados/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  deleteEmpleado
);

// ------------------------ Routing Facturación ------------------------------
router.get("/facturaciones", getFacturacion);

router.get(
  "/facturaciones/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  getFacturacionById
);

router.post(
  "/facturaciones",
  body("noFactura")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("Este campo es obligatorio"),
  body("fechaVenta")
    .isDate()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("La fecha de ingreso es obligatoria"),
  body("montoArticulos")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("Este campo es obligatorio")
    .custom((value) => value > 0)
    .withMessage("Monto no válido"),
  body("unidadesVendidas")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("Este campo es obligatorio")
    .custom((value) => value > 0)
    .withMessage("Valor no valido"),
  body("empleadoId")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("Este campo es obligatorio"),
  body("articuloId")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("Este campo es obligatorio"),
  body("usuarioId")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("Este campo es obligatorio"),
  handleInputErrorrs,
  createFacturacion
);

router.put(
  "/facturaciones/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  updateFacturacion
);

router.delete(
  "/facturaciones/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  deleteFacturacion
);

// ------------------------ Routing marca ------------------------------
router.get("/marcas", getMarca);

router.get(
  "/marcas/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  getMarcaById
);

router.post(
  "/marcas",
  body("descripcion")
    .notEmpty()
    .withMessage("La descripción de la marca es obligatoria"),
  handleInputErrorrs,
  createMarca
);

router.put(
  "/marcas/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  updateMarca
);

router.delete(
  "/marcas/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  deleteMarca
);

// ------------------------ Routing proveedor ------------------------------
router.get("/proveedores", getProveedor);

router.get(
  "/proveedores/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  getProveedorById
);

router.post(
  "/proveedores",
  body("nombreComercial").notEmpty().withMessage("Este campo es obligatorio"),
  body("rnc")
    .notEmpty()
    .withMessage("Este campo es obligatorio")
    .isLength({ min: 9, max: 9 })
    .withMessage("El rnc debe tener 9 caracteres"),
  body("fechaRegistro")
    .isDate()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("La fecha de registro es obligatoria"),
  handleInputErrorrs,
  createProveedor
);

router.put(
  "/proveedores/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  updateProveedor
);

router.delete(
  "/proveedores/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  deleteProveedor
);

// ------------------------ Routing Tipos de Usuarios ------------------------------
router.get("/tiposUsuarios", getTipoUsuario);

router.get(
  "/tiposUsuarios/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  getTipoUsuarioById
);

router.post(
  "/tiposUsuarios",
  body("descripcion").notEmpty().withMessage("Este campo es obligatorio"),

  handleInputErrorrs,
  createTiposUsuarios
);

router.put(
  "/tiposUsuarios/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  updateTiposUsuarios
);

router.delete(
  "/tiposUsuarios/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  deleteTiposUsuarios
);

// ------------------------ Routing Usuarios ------------------------------
router.get("/usuarios", getUsuarios);

router.get(
  "/usuarios/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  getUsuariosById
);

router.post(
  "/usuarios",
  body("nombre")
    .notEmpty()
    .withMessage("El nombre del empleado es obligatorio"),
  body("cedula")
    .notEmpty()
    .withMessage("La cédula del empleado es obligatoria")
    .isLength({ min: 11, max: 11 })
    .withMessage("La cédula debe tener 11 caracteres"),
  body("limitedeCredito")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("Este campo es Obligatorio")
    .custom((value) => value > 0)
    .withMessage("Crédito no valido"),
  body("tipoUsuarioId")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("Este campo es Obligatorio"),
  body("fechaRegistro")
    .isDate()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("La fecha de ingreso es obligatoria"),
  handleInputErrorrs,
  createUsuario
);

router.put(
  "/usuarios/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  updateUsuario
);

router.delete(
  "/usuarios/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrorrs,
  deleteUsuario
);

export default router;
