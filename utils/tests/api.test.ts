import { api } from "../api";

// mock fetch
const mockJson = jest.fn();
global.fetch = () =>
  Promise.resolve({
    json: mockJson,
  }) as any;

describe("getDirection", () => {
  it("should return position", async () => {
    expect.assertions(1);
    mockJson.mockReturnValue(
      Promise.resolve({
        result: "success",
        detail: { latitude: 1, longitude: 2 },
      })
    );
    expect(await api.getDirection("xxx")).toEqual({
      latitude: 1,
      longitude: 2,
    });
  });

  it("should throw an error if result is not 'success'", async () => {
    expect.assertions(1);
    mockJson.mockReturnValue(Promise.resolve({ result: "not found" }));
    try {
      await api.getDirection("xxx");
    } catch (e) {
      if (e instanceof Error)
        expect(e.message).toBe("failed to fetch data from API server");
    }
  });

  it("should throw an erro if network call failed", async () => {
    expect.assertions(1);
    const err = new Error("network error!");
    mockJson.mockImplementation(() => {
      throw err;
    });
    try {
      await api.getDirection("a");
    } catch (e) {
      expect(e).toBe(err);
    }
  });
});
