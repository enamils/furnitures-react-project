import type { AuthResponseType } from "../types/authType";

const API_URL = import.meta.env.VITE_FURNITURES_URL;

export const authService = {
    async login(email: string, password: string): Promise<AuthResponseType> {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to connect');
        }

        return response.json();
    },

    async register(email: string, password: string): Promise<AuthResponseType> {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }

        return response.json();
    }
};