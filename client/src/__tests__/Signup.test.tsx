import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Signup from "../pages/Signup";

test("renders Signup heading", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </Provider>
  );

  const heading = screen.getByRole("heading", { name: /create account/i });
  expect(heading).toBeInTheDocument();
});
