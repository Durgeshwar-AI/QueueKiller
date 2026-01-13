import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "../pages/Login";
import authReducer, { type IauthState } from "../redux/auth/authSlice";

/* -------------------- Mock navigate -------------------- */
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

/* -------------------- Base state -------------------- */
const baseAuthState: IauthState = {
  role: "",
  name: "",
  token: "",
  isLoggedIn: false,
  loading: false,
  error: null,
};

/* -------------------- Store factory -------------------- */
const makeStore = (preloadedAuth?: Partial<IauthState>) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: { ...baseAuthState, ...preloadedAuth } },
  });

/* -------------------- Fetch mock -------------------- */
const mockFetch = jest.fn();

beforeEach(() => {
  mockNavigate.mockReset();
  mockFetch.mockReset();
  global.fetch = mockFetch as jest.Mock;
  localStorage.clear();
});

/* ==================== TESTS ==================== */

test("renders Login heading", () => {
  const store = makeStore();

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  expect(
    screen.getByRole("heading", { name: /login/i })
  ).toBeInTheDocument();
});

test("submits credentials and navigates home on success", async () => {
  const store = makeStore();
  const user = userEvent.setup();

  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({
      token: "test-token",
      user: { name: "Test User", role: "user" },
    }),
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  await user.type(screen.getByLabelText(/email/i), "user@example.com");
  await user.type(screen.getByLabelText(/password/i), "hunter2");

  // ✅ FIX: scope to login form
  const form = screen.getByLabelText(/login form/i);

  await user.click(
    within(form).getByRole("button", { name: /login/i })
  );

  await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

  const [, requestInit] = mockFetch.mock.calls[0];
  const body = JSON.parse(String(requestInit?.body));

  expect(body).toEqual({
    email: "user@example.com",
    password: "hunter2",
  });

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});

test("shows loading state and disables button when auth is loading", () => {
  const store = makeStore({ loading: true });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  const button = screen.getByRole("button", { name: /logging in/i });
  expect(button).toBeDisabled();
});
