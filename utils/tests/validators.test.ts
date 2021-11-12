import { Position } from "../types";
import { validatePosition } from "../validators";

const position: Position = { latitude: 1, longitude: 2 };

describe("validatePosition", () => {
  it("should validate position object successfully", () => {
    expect.assertions(1);
    expect(validatePosition(position)).toEqual(position);
  });

  it("should return position with code successfully", () => {
    expect.assertions(1);
    const positionWithCode = { ...position, code: "xxx" };
    expect(validatePosition(positionWithCode)).toEqual(positionWithCode);
  });

  it("should throw an error if passed object is falsy value", () => {
    expect.assertions(1);
    try {
      validatePosition(null);
    } catch (e) {
      if (e instanceof Error)
        expect(e.message).toBe(`validation error - data is ${null}`);
    }
  });

  it("should throw an error if latitude is invalid", () => {
    expect.assertions(1);
    try {
      validatePosition({ ...position, latitude: "abcd" });
    } catch (e) {
      if (e instanceof Error)
        expect(e.message).toBe("validation error - invalid latitude: abcd");
    }
  });

  it("should throw an error if longitude is invalid", () => {
    expect.assertions(1);
    try {
      validatePosition({ ...position, longitude: "abcd" });
    } catch (e) {
      if (e instanceof Error)
        expect(e.message).toBe("validation error - invalid longitude: abcd");
    }
  });

  it("should throw an error if code is invalid", () => {
    expect.assertions(1);
    try {
      validatePosition({ ...position, code: true });
    } catch (e) {
      if (e instanceof Error)
        expect(e.message).toBe("validation error - invalid code: true");
    }
  });
});
