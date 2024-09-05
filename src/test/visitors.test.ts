import { expect } from "chai";
import request from "supertest";
import { createServer } from "../server";
import express, { Express } from "express";
import "mocha";

let app: Express;

before(async () => {
  await createServer(express()).then((result) => (app = result));
});

describe("Visitors", () => {
  it("Should GET visitors for today", async () => {
    const result = await request(app).get("/visitors").send();
    expect(result.body).to.have.property("id");
    expect(result.body).to.have.property("value");
  });
});
