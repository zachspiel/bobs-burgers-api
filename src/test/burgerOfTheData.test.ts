import { expect } from "chai";
import request from "supertest";
import { createServer } from "../server";
import express, { Express } from "express";
import "mocha";

const TOTAL_BURGERS_OF_THE_DAY = 333;

let app: Express;

before(async () => {
  await createServer(express()).then((result) => (app = result));
});

describe("Burgers", () => {
  it("Should GET all burgers of the day", async () => {
    const result = await request(app).get("/burgerOfTheDay").send();
    expect(result.body).to.have.lengthOf(TOTAL_BURGERS_OF_THE_DAY);
  });

  it("Should GET all burgers of the day from graphql", async () => {
    const result = await request(app)
      .post("/graphql/burgerOfTheDay")
      .send({ query: "{ burgersOfTheDay { id } }" });
    expect(result.body.data.burgersOfTheDay).to.have.lengthOf(TOTAL_BURGERS_OF_THE_DAY);
  });

  it("Should GET the first burger of the day with an id of 1", async () => {
    const result = await request(app).get("/burgerOfTheDay/1").send();
    expect(result.body.id).to.equal(1);
  });

  it("Should GET first burger of the day from graphql", async () => {
    const result = await request(app)
      .post("/graphql/burgerOfTheDay/1")
      .send({ query: "{ burgerOfTheDay(burgerId: 1) { id } }" });
    expect(result.body.data.burgerOfTheDay[0].id).to.equal(1);
  });

  it("Should GET an error for a `burger of` the day with id 1000", async () => {
    const result = await request(app).get("/burgerOfTheDay/1000").send();
    expect(result.body.error).to.equal(
      "Error while retreiving data with id 1000 in route burgerOfTheDay."
    );
  });

  it("Should GET the first five burgers of the day", async () => {
    const result = await request(app).get("/burgerOfTheDay?limit=5").send();
    expect(result.body).to.have.lengthOf(5);
  });

  it("Should GET the first three burgers of the day", async () => {
    const result = await request(app).get("/burgerOfTheDay/[1,2,3]").send();
    expect(result.body).to.have.lengthOf(3);
  });

  it("Should GET the first three burgers of the day", async () => {
    const result = await request(app).get("/burgerOfTheDay/1,2,3").send();
    expect(result.body).to.have.lengthOf(3);
  });

  it("Should GET first three burgers of the day from graphql", async () => {
    const result = await request(app)
      .post("/graphql/burgerOfTheDay")
      .send({ query: "{ burgerOfTheDayByIds(burgerIds: [1,2,3]) { id } }" });
    expect(result.body.data.burgerOfTheDayByIds).to.have.lengthOf(3);
  });

  it("Should skip the first five burgers of the day ", async () => {
    const result = await request(app).get("/burgerOfTheDay?skip=5").send();
    expect(result.body).to.have.lengthOf(TOTAL_BURGERS_OF_THE_DAY - 5);
    expect(result.body[0].id).to.equal(6);
  });
});
