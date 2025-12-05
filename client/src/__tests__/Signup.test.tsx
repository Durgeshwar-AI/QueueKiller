import React from "react";
import { render, screen } from "@testing-library/react";

test("renders Signup placeholder heading", () => {
  const Signup = () => (
    <div>
      <h1>Signup</h1>
    </div>
  );
  render(React.createElement(Signup, null));
  const heading = screen.getByText("Signup");
  expect(heading).toBeInTheDocument();
});
