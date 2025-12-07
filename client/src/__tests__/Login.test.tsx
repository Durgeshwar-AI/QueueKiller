import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Login from "../pages/Login";

test("renders Login heading", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  const heading = screen.getByRole("heading", { name: /login/i });
  expect(heading).toBeInTheDocument();
});
