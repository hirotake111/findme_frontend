import { api } from "../api";

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
