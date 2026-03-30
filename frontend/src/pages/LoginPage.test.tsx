import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './LoginPage'

describe('LoginPage', () => {

    test('renderiza el formulario de login', () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        )

        expect(
            screen.getByLabelText(/correo electrónico/i)
        ).toBeInTheDocument()

        expect(
            screen.getByLabelText(/contraseña/i)
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: /entrar/i })
        ).toBeInTheDocument()
    })

    test('los campos son obligatorios', () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        )

        expect(
            screen.getByLabelText(/correo electrónico/i)
        ).toHaveAttribute('required')

        expect(
            screen.getByLabelText(/contraseña/i)
        ).toHaveAttribute('required')
    })

    test('actualiza los inputs al escribir', () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        )

        const email =
            screen.getByLabelText(/correo electrónico/i) as HTMLInputElement

        const password =
            screen.getByLabelText(/contraseña/i) as HTMLInputElement

        fireEvent.change(email, {
            target: { value: 'ana@test.com' }
        })

        fireEvent.change(password, {
            target: { value: '123456' }
        })

        expect(email.value).toBe('ana@test.com')
        expect(password.value).toBe('123456')
    })

})