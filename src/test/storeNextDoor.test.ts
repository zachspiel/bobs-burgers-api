import { expect } from "chai";
import request from "supertest";
import { createServer } from "../server";
import express, { Express } from "express";
import "mocha";

let app: Express;

before(async () => {
  await createServer(express()).then((result) => (app = result));
});

describe("StoreNextDoor", () => {
  it("Should GET all stores next door", async () => {
    const result = await request(app).get("/storeNextDoor").send();
    expect(result.body).to.have.length.greaterThan(0);
  });

  it("Should GET all stores next door from graphql", async () => {
    const result = await request(app)
      .post("/graphql/storeNextDoor")
      .send({ query: "{ storesNextDoor { id } }" });
    expect(result.body.data.storesNextDoor).to.have.length.greaterThan(0);
  });

  it("Should GET the first store next door with an id of 1", async () => {
    const result = await request(app).get("/storeNextDoor/1").send();
    expect(result.body.id).to.equal(1);
  });

  it("Should GET first store next door from graphql", async () => {
    const result = await request(app)
      .post("/graphql/storeNextDoor")
      .send({ query: "{ storeNextDoor(storeNextDoorId: 1) { id } }" });
    expect(result.body.data.storeNextDoor[0].id).to.equal(1);
  });

  it("Should GET an error for an store next door with id 1000", async () => {
    const result = await request(app).get("/storeNextDoor/1000").send();
    expect(result.body.error).to.equal(
      "Error while retreiving data with id 1000 in route storeNextDoor."
    );
  });

  it("Should GET the first five stores next door", async () => {
    const result = await request(app).get("/storeNextDoor?limit=5").send();
    expect(result.body).to.have.lengthOf(5);
  });

  it("Should GET the first three stores next door", async () => {
    const result = await request(app).get("/storeNextDoor/[1,2,3]").send();
    expect(result.body).to.have.lengthOf(3);
  });

  it("Should GET the first three stores next door", async () => {
    const result = await request(app).get("/storeNextDoor/1,2,3").send();
    expect(result.body).to.have.lengthOf(3);
  });

  it("Should GET first three stores next door from graphql", async () => {
    const result = await request(app).post("/graphql/storeNextDoor").send({
      query: "{ storeNextDoorByIds(storeNextDoorIds: [1,2,3]) { id } }",
    });
    expect(result.body.data.storeNextDoorByIds).to.have.lengthOf(3);
  });

  it("Should skip the first five stores next door", async () => {
    const result = await request(app).get("/storeNextDoor?skip=5").send();
    expect(result.body).to.have.length.greaterThan(0);
    expect(result.body[0].id).to.equal(6);
  });
});
