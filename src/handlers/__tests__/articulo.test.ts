import request from "supertest";
import server from "../../server";

describe("POST /api/articulos", () => {
  test("should display validation errors", async () => {
    const response = await request(server).post("/api/articulos").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");

    expect(response.status).not.toBe(404);
  });

  test("should create a new article", async () => {
    const response = await request(server).post("/api/articulos").send({
      descripcion: "Articulo actulizar - Test",
      costo: "2333.00",
      existencia: 150,
      estado: true,
      marcaId: 1,
      provedorID: 2,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
  });
});
