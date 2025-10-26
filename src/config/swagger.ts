import swaggerJSDoc, { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.2",
    info: {
      title: "API - Sistema de Gestión de Cafetería Universitaria",
      version: "1.0.0",
      description:
        "Documentación oficial de la API REST para la gestión de cafeterías, empleados, usuarios, artículos, proveedores y facturación en la Cafetería Universitaria de UNAPEC.",
      contact: {
        name: "Richard De León",
        email: "richard@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor local de desarrollo",
      },
    ],
    tags: [
      { name: "Campus", description: "Gestión de los campus universitarios" },
      {
        name: "Cafeterías",
        description: "Gestión de cafeterías en cada campus",
      },
      { name: "Empleados", description: "Gestión del personal de atención" },
      { name: "Usuarios", description: "Gestión de estudiantes y profesores" },
      {
        name: "Artículos",
        description: "Gestión de artículos disponibles para la venta",
      },
      {
        name: "Proveedores",
        description: "Gestión de proveedores de artículos",
      },
      { name: "Marcas", description: "Gestión de marcas de productos" },
      {
        name: "Tipos de Usuarios",
        description: "Clasificación de los tipos de usuarios",
      },
      { name: "Facturaciones", description: "Gestión de facturas y ventas" },
    ],
  },
  apis: [
    "./src/router/**/*.ts", // todas las rutas
    "./src/models/**/*.ts", // esquemas de modelos
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
