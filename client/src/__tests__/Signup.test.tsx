import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Signup from "../pages/Signup";
import authReducer, { type IauthState } from "../redux/auth/authSlice";

/* -------------------- Base auth state -------------------- */
const baseAuthState: IauthState = {
  role: "",
  name: "",
  token: "",
  isLoggedIn: false,
  loading: false,
  error: null,
};

/* -------------------- Mock navigate -------------------- */
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

/* -------------------- Fetch mock -------------------- */
const mockFetch = jest.fn();

/* -------------------- Store factory -------------------- */
const makeStore = (preloadedAuth?: Partial<IauthState>) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState: { auth: { ...baseAuthState, ...preloadedAuth } },
  });

beforeEach(() => {
  mockNavigate.mockReset();
  mockFetch.mockReset();
  global.fetch = mockFetch as jest.Mock;
  localStorage.clear();
});

/* ==================== TESTS ==================== */

test("renders Signup heading", () => {
  const store = makeStore();

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </Provider>
  );

  expect(
    screen.getByRole("heading", { name: /create account/i })
  ).toBeInTheDocument();
});

test("alerts when passwords do not match", async () => {
  const store = makeStore();
  const user = userEvent.setup();
  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </Provider>
  );

  await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
  await user.type(screen.getByLabelText(/email/i), "jane@example.com");
  await user.type(screen.getByLabelText(/^password$/i), "password1");
  await user.type(screen.getByLabelText(/confirm password/i), "password2");

  // ✅ FIX: scope to signup form
  const form = screen.getByLabelText(/signup form/i);

  await user.click(
    within(form).getByRole("button", { name: /sign up/i })
  );

  expect(alertSpy).toHaveBeenCalledWith("Passwords do not match");
  expect(mockFetch).not.toHaveBeenCalled();

  alertSpy.mockRestore();
});

test("submits signup and navigates home on success", async () => {
  const store = makeStore();
  const user = userEvent.setup();

  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({
      token: "new-token",
      user: { name: "Jane Doe", role: "user" },
    }),
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </Provider>
  );

  await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
  await user.type(screen.getByLabelText(/email/i), "jane@example.com");
  await user.type(screen.getByLabelText(/^password$/i), "password1");
  await user.type(screen.getByLabelText(/confirm password/i), "password1");

  // ✅ FIX: scope to signup form
  const form = screen.getByLabelText(/signup form/i);

  await user.click(
    within(form).getByRole("button", { name: /sign up/i })
  );

  await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

  const [, requestInit] = mockFetch.mock.calls[0];
  const body = JSON.parse(String(requestInit?.body));

  expect(body).toEqual({
    name: "Jane Doe",
    email: "jane@example.com",
    password: "password1",
  });

  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"));
});
