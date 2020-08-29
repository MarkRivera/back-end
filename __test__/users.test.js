const request = require("supertest");
const server = require("../api/server");
const knex = require("knex");
const db = require("../data/db-config");

describe("Server.js Test", () => {
  it("Should return Status 200 OK on '/' route", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
  });
});

// Auth Endpoints Tests:

describe("Auth Endpoints", () => {
  beforeAll(async () => {
    await db.raw("TRUNCATE users RESTART IDENTITY CASCADE");
  });

  it("Should Register User and receive 201 Created response", async () => {
    const userData = {
      email: "Cristina@email.com",
      password: "1234",
      isGovernmentOfficial: false,
      zipCode: 51001,
    };

    const response = await request(server)
      .post("/api/auth/register")
      .send(userData);
    expect(response.status).toBe(201);
  });

  it("Should login user and receive 200 OK response", async () => {
    const userData = {
      email: "Cristina@email.com",
      password: "1234",
    };

    const response = await request(server)
      .post("/api/auth/login")
      .send(userData);
    expect(response.status).toBe(200);
  });
});
