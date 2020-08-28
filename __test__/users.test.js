const request = require("supertest");
const server = require("../api/server");
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
    await db("users").truncate();
  });

  it("Should create a user and receive an 201 Created response", async () => {
    const userData = {
      email: "Test@test.com",
      password: "12345",
      isGovernmentOfficial: false,
      zipCode: 12345,
    };

    const response = await request(server)
      .post("/api/auth/register")
      .send(userData);
    expect(response.status).toBe(201);
    expect(response).toBeDefined();
  });
});
