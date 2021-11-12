import { render } from "@testing-library/react";

import Direction from "../pages/[positionId]";
import Home from "../pages";

// mock useRouter
// const mockUseRouter = jest.fn();
// jest.mock("next/dist/client/router", () => ({
//   useRouter: () => mockUseRouter(),
// }));

// mock usePositionId
const mockUsePositionId = jest.fn();
jest.mock("../hooks/directionHooks", () => ({
  usePositionId: () => mockUsePositionId(),
}));

// mock Initializer
jest.mock("../components/direction/Initializer/Initializer");
// mock CodeModal
jest.mock("../components/common/modal/CodeModal/CodeModal");
// mock Home page
jest.mock("../pages");
(Home as jest.Mock).mockReturnValue(<p>Home</p>);

it("should display Home page if given ID is valid", () => {
  expect.assertions(1);
  mockUsePositionId.mockReturnValue("xxx");
  const { container } = render(<Direction />);
  expect(container.firstChild?.textContent).toEqual(
    "mock code modal component"
  );
});

it("should display nothing if given ID is invalid", () => {
  expect.assertions(1);
  mockUsePositionId.mockReturnValue(null);
  const { container } = render(<Direction />);
  expect(container.firstChild).toEqual(null);
});
