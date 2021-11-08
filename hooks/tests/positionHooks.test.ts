import { renderHook } from "@testing-library/react-hooks";
import { Position } from "../../utils/types";
import { useUpdateCurrentPosition } from "../positionHooks";

// mock setPosition
const mockSetPosition = jest.fn();
jest.mock("../../utils/location", () => ({
  setPosition: (pos: Position) => mockSetPosition(pos),
}));

// mock useAppSelector
const mockSelector = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: () => mockSelector(),
}));

describe("useUpdateCurrentPosition", () => {
  it("should return position object", () => {
    expect.assertions(2);
    const position: Position = { latitude: 1.111, longitude: 2.222 };
    mockSelector.mockReturnValue(position);
    const { result } = renderHook(() => useUpdateCurrentPosition());
    expect(result.current).toEqual(position);
    expect(mockSetPosition).toHaveBeenCalledWith(position);
  });
});
