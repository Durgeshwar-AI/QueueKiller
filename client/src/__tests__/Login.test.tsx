import React from 'react'
import { render, screen } from '@testing-library/react'

test('renders Login placeholder heading', () => {
	const Login = () => <div><h1>Login</h1></div>
	render(React.createElement(Login, null))
	const heading = screen.getByText('Login')
	expect(heading).toBeInTheDocument()
})
