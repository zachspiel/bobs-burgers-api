import { expect } from "chai";
import { Request } from "express";
import { getOptions } from "../rest/util/util";

describe("Utilities", () => {
  const defaultResult = {
    limit: 600,
    skip: 0,
    sort: {
      id: 1,
    },
  };

  it("Returns a default value if no params are used", () => {
    const mockRequest = {
      query: {},
    };

    expect(getOptions(mockRequest as Request)).to.deep.equals(defaultResult);
  });

  it("Properly parses sort by and order by asc", () => {
    const mockRequest = {
      query: {
        sortBy: "name",
        OrderBy: "asc",
      },
    };

    const expected = { ...defaultResult, sort: { name: 1 } };

    expect(getOptions(mockRequest as unknown as Request)).to.deep.equals(
      expected
    );
  });

  it("Properly parses sort by and order by desc", () => {
    const mockRequest = {
      query: {
        sortBy: "name",
        OrderBy: "desc",
      },
    };

    const expected = { ...defaultResult, sort: { name: -1 } };

    expect(getOptions(mockRequest as unknown as Request)).to.deep.equals(
      expected
    );
  });

  it("Properly returns default value if OrderBy is missing", () => {
    const mockRequest = {
      query: {
        sortBy: "name",
      },
    };

    const expected = { ...defaultResult, sort: { name: 1 } };

    expect(getOptions(mockRequest as unknown as Request)).to.deep.equals(
      expected
    );
  });

  it("Properly parses limit and sort by params", () => {
    const mockRequest = {
      query: {
        sortBy: "name",
        OrderBy: "desc",
        limit: 1,
      },
    };

    const expected = { ...defaultResult, sort: { name: -1 }, limit: 1 };

    expect(getOptions(mockRequest as unknown as Request)).to.deep.equals(
      expected
    );
  });

  it("Doesn't explode for invalid limit and skip", () => {
    const mockRequest = {
      query: {
        limit: "a",
        skip: "invalid",
      },
    };

    const expected = {
      skip: 0,
      sort: {
        id: 1,
      },
      limit: 600,
    };

    expect(getOptions(mockRequest as unknown as Request)).to.deep.equals(
      expected
    );
  });
});
