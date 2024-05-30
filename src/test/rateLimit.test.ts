import { expect } from "chai";
import request from "supertest";
import { createServer } from "../server";
import express, { Express } from "express";
import "mocha";

let app: Express;

before(async () => {
  await createServer(express()).then((result) => (app = result));
});

describe("Rate Limit", () => {
  it("Should block requests after 200 API calls", async () => {
    const totalRequests = 200;
    const requests: Promise<request.Response>[] = [];

    for (let index = 0; index < totalRequests; index++) {
      requests.push(
        request(app)
          .get(`/episodes/${index + 1}`)
          .send()
      );
    }

    const results = await Promise.all(requests);

    results.forEach((result) => {
      expect(result.statusCode).to.equal(200);
    });

    const result = await request(app).get(`/episodes/${201}`).send();
    expect(result.statusCode).to.not.equal(200);
  }).timeout(5000);
});
