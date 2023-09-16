import { expect } from "chai";
import request from "supertest";
import { createServer } from "../server";
import express, { Express } from "express";
import "mocha";

const TOTAL_EPISODES = 260;

let app: Express;

before(async () => {
  await createServer(express()).then((result) => (app = result));
});

describe("Episodes", () => {
  it("Should GET all episodes", async () => {
    const result = await request(app).get("/episodes").send();
    expect(result.body).to.have.lengthOf(TOTAL_EPISODES);
  });

  it("Should GET all episodes from graphql", async () => {
    const result = await request(app)
      .post("/graphql/episodes")
      .send({ query: "{ episodes { id } }" });
    expect(result.body.data.episodes).to.have.lengthOf(TOTAL_EPISODES);
  });

  it("Should GET the first episode with an id of 1", async () => {
    const result = await request(app).get("/episodes/1").send();
    expect(result.body.id).to.equal(1);
  });

  it("Should GET first episode from graphql", async () => {
    const result = await request(app)
      .post("/graphql/episodes")
      .send({ query: "{ episode(episodeId: 1) { id } }" });
    expect(result.body.data.episode[0].id).to.equal(1);
  });

  it("Should GET an error for an episode with id 1000", async () => {
    const result = await request(app).get("/episodes/1000").send();
    expect(result.body.error).to.equal(
      "Error while retreiving data with id 1000 in route episodes."
    );
  });

  it("Should GET the first five episodes", async () => {
    const result = await request(app).get("/episodes?limit=5").send();
    expect(result.body).to.have.lengthOf(5);
  });

  it("Should GET the first three episodes ", async () => {
    const result = await request(app).get("/episodes/[1,2,3]").send();
    expect(result.body).to.have.lengthOf(3);
  });

  it("Should GET the first three episodes", async () => {
    const result = await request(app).get("/episodes/1,2,3").send();
    expect(result.body).to.have.lengthOf(3);
  });

  it("Should GET first three episodes from graphql", async () => {
    const result = await request(app)
      .post("/graphql/episodes")
      .send({ query: "{ episodeByIds(episodeIds: [1,2,3]) { id } }" });
    expect(result.body.data.episodeByIds).to.have.lengthOf(3);
  });

  it("Should skip the first five episodes", async () => {
    const result = await request(app).get("/episodes?skip=5").send();
    expect(result.body).to.have.lengthOf(TOTAL_EPISODES - 5);
    expect(result.body[0].id).to.equal(6);
  });
});
