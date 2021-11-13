import { render } from "@testing-library/react";

import Geolocation from "./Geolocation";

// mock useGetCurrentPosition hook
const mockGetCurrentPosition = jest.fn();
jest.mock("../../../hooks/searchHooks", () => ({
  useGetCurrentPosition: () => mockGetCurrentPosition(),
}));

beforeEach(() => {
  mockGetCurrentPosition.mockClear();
});

it("should render nothing", () => {
  expect.assertions(1);
  const { container } = render(<Geolocation />);
  expect(container.firstChild).toBeNull();
});

it("should invoke getCurrentPosition", () => {
  expect.assertions(1);
  render(<Geolocation />);
  expect(mockGetCurrentPosition).toHaveBeenCalledTimes(1);
});
