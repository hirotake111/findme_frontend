import { render } from "@testing-library/react";

import Direction from "../pages/[positionId]";
import Home from "../pages";

// mock useRouter
const mockUseRouter = jest.fn();
jest.mock("next/dist/client/router", () => ({
  useRouter: () => mockUseRouter(),
}));
// mock Initializer
import Initializer from "../components/direction/Initializer/Initializer";
jest.mock("../components/direction/Initializer/Initializer");

// mock Home page
jest.mock("../pages");
(Home as jest.Mock).mockReturnValue(<p>Home</p>);

it("should display Home page if given ID is valid", () => {
  expect.assertions(1);
  mockUseRouter.mockReturnValue({ query: { positionId: "xxx" } });
  const { container } = render(<Direction />);
  expect(container.firstChild?.textContent).toEqual("Home");
});

it("should display an error message if given ID is invalid", () => {
  expect.assertions(1);
  mockUseRouter.mockReturnValue({ query: { positionId: 123 } });
  const { container } = render(<Direction />);
  expect(container.firstChild?.textContent).toEqual(
    "Error - invalid position ID: 123"
  );
});
