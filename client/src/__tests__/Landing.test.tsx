import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MemoryRouter } from "react-router-dom";
import Landing from "../pages/Landing";

test("renders hero section text", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    </Provider>
  );

  const heroText = screen.getByText(/book appointments with ease/i);
  expect(heroText).toBeInTheDocument();
});
