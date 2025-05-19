import { expect } from "chai";
import request from "supertest";
import { createServer } from "../server";
import express, { Express } from "express";
import "mocha";

let app: Express;

before(async () => {
  await createServer(express()).then((result) => (app = result));
});

describe("Root endpoint", () => {
  it("Gets information for available routes", async () => {
    const result = await request(app).get("/").send();
    expect(result.body).to.deep.equal({
      graphQL: "https://bobsburgers-api.herokuapp.com/graphql/",
      characters: "https://bobsburgers-api.herokuapp.com/characters/",
      episodes: "https://bobsburgers-api.herokuapp.com/episodes/",
      storeNextDoor: "https://bobsburgers-api.herokuapp.com/storeNextDoor/",
      pestControlTruck: "https://bobsburgers-api.herokuapp.com/pestControlTruck/",
      endCreditsSequence: "https://bobsburgers-api.herokuapp.com/endCreditsSequence/",
      burgerOfTheDay: "https://bobsburgers-api.herokuapp.com/burgerOfTheDay/",
    });
  });

  it("Returns error for invalid route", async () => {
    const result = await request(app).get("/INVALID_ROUTE").send();

    expect(result.body.error).to.equal(
      "Error while getting data for route: INVALID_ROUTE. Available options are: characters, episodes, pestControlTruck, endCreditsSequence or storeNextDoor."
    );
  });
});
