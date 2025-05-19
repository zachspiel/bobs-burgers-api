import { expect } from "chai";
import request from "supertest";
import express, { Express } from "express";
import "mocha";

import { createServer } from "../server";

let app: Express;

before(async () => {
  await createServer(express()).then((result) => (app = result));
});

describe("Characters", () => {
  it("Should GET all the characters", async () => {
    const result = await request(app).get("/characters").send();
    expect(result.body).length.to.be.greaterThan(0);
  });

  it("Should GET all characters from graphql", async () => {
    const result = await request(app)
      .post("/graphql/characters")
      .send({ query: "{ characters { id } }" });
    expect(result.body.data.characters).length.to.be.greaterThan(0);
  });

  it("Should GET the first character with an id of 1", async () => {
    const result = await request(app).get("/characters/1").send();
    expect(result.body.id).to.equal(1);
    expect(result.body.name).to.equal('"Dottie Minerva"');
  });

  it("Should GET first character from graphql", async () => {
    const result = await request(app)
      .post("/graphql/characters/1")
      .send({ query: "{ character(characterId: 1) { id } }" });
    expect(result.body.data.character[0].id).to.equal(1);
  });

  it("Should GET an error for a character with id 1000", async () => {
    const result = await request(app).get("/characters/1000").send();
    expect(result.body.error).to.equal(
      "Error while retreiving data with id 1000 in route characters."
    );
  });

  it("Should GET the first five characters", async () => {
    const result = await request(app).get("/characters?limit=5").send();
    expect(result.body).to.have.lengthOf(5);
  });

  it("Should GET the first three characters", async () => {
    const result = await request(app).get("/characters/[1,2,3]").send();
    expect(result.body).to.have.lengthOf(3);
  });

  it("Should GET the first three characters", async () => {
    const result = await request(app).get("/characters/1,2,3").send();
    expect(result.body).to.have.lengthOf(3);
  });

  it("Should GET first three characters from graphql", async () => {
    const result = await request(app)
      .post("/graphql/characters/1")
      .send({ query: "{ characterByIds(characterIds: [1,2,3]) { id } }" });
    expect(result.body.data.characterByIds).to.have.lengthOf(3);
  });

  it("Should skip the first five characters", async () => {
    const result = await request(app).get("/characters?skip=5").send();
    expect(result.body[0].id).to.equal(6);
  });

  it("Should GET the last character", async () => {
    const result = await request(app)
      .get("/characters?sortBy=name&OrderBy=desc&limit=1")
      .send();
    expect(result.body).to.have.lengthOf(1);
    expect(result.body[0].id).to.not.equal(1);
  });

  it("Should GET characters with Red hair", async () => {
    const result = await request(app).get("/characters?hair=Red").send();
    expect(result.body).length.to.be.greaterThan(0);
  });
});
