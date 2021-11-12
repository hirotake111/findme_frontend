import { api } from "../api";
import { Position } from "../types";

// mock fetch
const mockJson = jest.fn();
global.fetch = () =>
  Promise.resolve({
    json: mockJson,
  }) as any;

beforeEach(() => {
  mockJson.mockClear();
  mockJson.mockReset();
});

describe("getDestination", () => {
  it("should return 'success' and position data", async () => {
    expect.assertions(1);
    mockJson.mockReturnValue(
      Promise.resolve({
        result: "success",
        detail: { latitude: 1, longitude: 2 },
      })
    );
    expect(await api.getDestination("xxx")).toEqual({
      result: "success",
      position: { latitude: 1, longitude: 2 },
    });
  });

  it("should return 'code required' and position data", async () => {
    expect.assertions(1);
    mockJson.mockReturnValue(Promise.resolve({ result: "code required" }));
    expect(await api.getDestination("xxx")).toEqual({
      result: "code required",
    });
  });

  it("should throw an error if received message 'not found'", async () => {
    expect.assertions(1);
    mockJson.mockReturnValue(
      Promise.resolve({ result: "not found", detail: "unable to find data" })
    );
    try {
      await api.getDestination("xxx");
    } catch (e) {
      if (e instanceof Error) expect(e.message).toBe("404 - data not found");
    }
  });

  it("should throw an error if received any other error message", async () => {
    expect.assertions(1);
    mockJson.mockReturnValue(
      Promise.resolve({ result: "bad request", detail: "invalid ID" })
    );
    try {
      await api.getDestination("xxx");
    } catch (e) {
      if (e instanceof Error) expect(e.message).toBe("invalid ID");
    }
  });

  it("should throw an error if network call failed", async () => {
    expect.assertions(1);
    const err = new Error("network error....");
    mockJson.mockImplementation(() => {
      throw err;
    });
    try {
      await api.getDestination("xxx");
    } catch (e) {
      expect(e).toBe(err);
    }
  });
});

describe("getDestinationByCode", () => {
  it("should return 'success' and position data", async () => {
    expect.assertions(1);
    mockJson.mockReturnValue(
      Promise.resolve({
        result: "success",
        detail: { latitude: 1, longitude: 2 },
      })
    );
    expect(await api.getDestinationByCode("xxx", "code")).toEqual({
      result: "success",
      position: { latitude: 1, longitude: 2 },
    });
  });

  it("should throw an error if result is anything else", async () => {
    expect.assertions(1);
    mockJson.mockReturnValue(
      Promise.resolve({ result: "error", detail: "database error" })
    );
    try {
      await api.getDestinationByCode("xxx", "abcd");
    } catch (e) {
      if (e instanceof Error) expect(e.message).toBe("database error");
    }
  });
});

describe("createLink", () => {
  it("should return 'success', id and position data without code", async () => {
    expect.assertions(1);
    const id = "xxx";
    const position: Position = { latitude: 1.111, longitude: 2.22 };
    const detail = { id, position };
    mockJson.mockReturnValue(Promise.resolve({ result: "success", detail }));
    expect(await api.createLink(position)).toEqual({
      result: "success",
      link: "http://localhost:4444/xxx",
      position,
    });
  });

  it("should return 'success', id and position data with code", async () => {
    expect.assertions(1);
    const id = "xxx";
    const position: Position = { latitude: 1.111, longitude: 2.22, code: 1234 };
    const detail = { id, position };
    mockJson.mockReturnValue(Promise.resolve({ result: "success", detail }));
    expect(await api.createLink(position)).toEqual({
      result: "success",
      link: "http://localhost:4444/xxx",
      position,
    });
  });

  it("should throw an error if response is not 'success'", async () => {
    expect.assertions(1);
    const position: Position = { latitude: 1.111, longitude: 2.22, code: 1234 };
    mockJson.mockReturnValue(
      Promise.resolve({ result: "error", detail: "bad request" })
    );
    try {
      await api.createLink(position);
    } catch (e) {
      if (e instanceof Error)
        expect(e.message).toEqual("network error - bad request");
    }
  });

  it("should throw an error if returned position data is invalid", async () => {
    expect.assertions(1);
    const position: Position = { latitude: 1.111, longitude: 2.22, code: 1234 };
    mockJson.mockReturnValue(
      Promise.resolve({
        result: "success",
        detail: { id: "xxx", position: { latitude: "abcd", longitude: 1 } },
      })
    );
    try {
      await api.createLink(position);
    } catch (e) {
      if (e instanceof Error)
        expect(e.message).toEqual("validation error - invalid latitude: abcd");
    }
  });

  it("should throw an error if returned id is invalid", async () => {
    expect.assertions(1);
    const position: Position = { latitude: 1.111, longitude: 2.22, code: 1234 };
    mockJson.mockReturnValue(
      Promise.resolve({
        result: "success",
        detail: { id: null, position },
      })
    );
    try {
      await api.createLink(position);
    } catch (e) {
      if (e instanceof Error)
        expect(e.message).toEqual("validation error - invalid id: null");
    }
  });

  it("should throw an error if network call failed", async () => {
    expect.assertions(1);
    const err = new Error("network error....");
    const position: Position = { latitude: 1.111, longitude: 2.22, code: 1234 };
    mockJson.mockImplementation(() => {
      throw err;
    });
    try {
      await api.createLink(position);
    } catch (e) {
      expect(e).toBe(err);
    }
  });
});
