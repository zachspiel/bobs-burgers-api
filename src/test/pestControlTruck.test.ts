import { expect } from "chai";
import request from "supertest";
import express, { Express } from "express";
import "mocha";

import { createServer } from "../server";

let app: Express;

before(async () => {
  await createServer(express()).then((result) => (app = result));
});

describe("Pest Control Truck", () => {
  it("Should GET all pest control trucks", async () => {
    const result = await request(app).get("/pestControlTruck").send();
    expect(result.body).to.have.length.greaterThan(0);
  });

  it("Should GET all pest control trucks from graphql", async () => {
    const result = await request(app)
      .post("/graphql/pestControlTruck")
      .send({ query: "{ pestControlTrucks { id } }" });
    expect(result.body.data.pestControlTrucks).to.length.greaterThan(0);
  });

  it("Should GET the first pest control truck with an id of 1", async () => {
    const result = await request(app).get("/pestControlTruck/1").send();
    expect(result.body.id).to.equal(1);
  });

  it("Should GET first pest control truck from graphql", async () => {
    const result = await request(app)
      .post("/graphql/pestControlTruck")
      .send({ query: "{ pestControlTruck(pestControlTruckId: 1) { id } }" });
    expect(result.body.data.pestControlTruck[0].id).to.equal(1);
  });

  it("Should GET an error for an pest control truck with id 1000", async () => {
    const result = await request(app).get("/pestControlTruck/1000").send();
    expect(result.body.error).to.equal(
      "Error while retreiving data with id 1000 in route pestControlTruck."
    );
  });

  it("Should GET the first five pest control trucks", async () => {
    const result = await request(app).get("/pestControlTruck?limit=5").send();
    expect(result.body).to.have.lengthOf(5);
  });

  it("Should GET the first three pest control trucks", async () => {
    const result = await request(app).get("/pestControlTruck/[1,2,3]").send();
    expect(result.body).to.have.lengthOf(3);
  });

  it("Should GET the first three pest control trucks", async () => {
    const result = await request(app).get("/pestControlTruck/1,2,3").send();
    expect(result.body).to.have.lengthOf(3);
  });

  it("Should GET first three pest control trucks from graphql", async () => {
    const result = await request(app).post("/graphql/pestControlTruck").send({
      query: "{ pestControlTruckByIds(pestControlTruckIds: [1,2,3]) { id } }",
    });
    expect(result.body.data.pestControlTruckByIds).to.have.lengthOf(3);
  });

  it("Should skip the first five pest control trucks", async () => {
    const result = await request(app).get("/pestControlTruck?skip=5").send();
    expect(result.body).to.have.length.greaterThan(1);
    expect(result.body[0].id).to.equal(6);
  });
});
