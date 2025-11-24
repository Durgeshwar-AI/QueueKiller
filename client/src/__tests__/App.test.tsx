import React from "react"
import { render } from "@testing-library/react"
import App from "../App"

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the main page", () => {
    render(React.createElement(App, null))
    expect(true).toBeTruthy()
})
