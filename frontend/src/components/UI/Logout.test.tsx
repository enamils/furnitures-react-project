import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Logout from './Logout';

describe('Logout', () => {
    it('renders the logout button', () => {
        const mockLogout = vi.fn();
        render(<Logout onLogout={mockLogout} />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('renders the FontAwesome icon', () => {
        const mockLogout = vi.fn();
        const { container } = render(<Logout onLogout={mockLogout} />);

        const icon = container.querySelector('svg');
        expect(icon).toBeInTheDocument();
    });

    it('renders the Logout text', () => {
        const mockLogout = vi.fn();
        render(<Logout onLogout={mockLogout} />);

        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('has correct button type', () => {
        const mockLogout = vi.fn();
        render(<Logout onLogout={mockLogout} />);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'button');
    });

    it('has correct CSS classes', () => {
        const mockLogout = vi.fn();
        render(<Logout onLogout={mockLogout} />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('text-[color:var(--white)]');
        expect(button).toHaveClass('cursor-pointer');
    });

    it('calls onLogout when button is clicked', async () => {
        const mockLogout = vi.fn();
        const user = userEvent.setup();

        render(<Logout onLogout={mockLogout} />);

        const button = screen.getByRole('button');
        await user.click(button);

        expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    it('calls onLogout only once per click', async () => {
        const mockLogout = vi.fn();
        const user = userEvent.setup();

        render(<Logout onLogout={mockLogout} />);

        const button = screen.getByRole('button');
        await user.click(button);

        expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    it('calls onLogout multiple times when clicked multiple times', async () => {
        const mockLogout = vi.fn();
        const user = userEvent.setup();

        render(<Logout onLogout={mockLogout} />);

        const button = screen.getByRole('button');
        await user.click(button);
        await user.click(button);
        await user.click(button);

        expect(mockLogout).toHaveBeenCalledTimes(3);
    });

    it('has aria-hidden attribute on icon', () => {
        const mockLogout = vi.fn();
        const { container } = render(<Logout onLogout={mockLogout} />);

        const icon = container.querySelector('svg');
        expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('Logout text has sr-only class for accessibility', () => {
        const mockLogout = vi.fn();
        render(<Logout onLogout={mockLogout} />);

        const span = screen.getByText('Logout');
        expect(span).toHaveClass('sr-only', 'sm:not-sr-only');
    });

    it('renders without crashing when onLogout is provided', () => {
        const mockLogout = vi.fn();
        const { container } = render(<Logout onLogout={mockLogout} />);

        expect(container).toBeTruthy();
    });

    it('button is clickable and not disabled', () => {
        const mockLogout = vi.fn();
        render(<Logout onLogout={mockLogout} />);

        const button = screen.getByRole('button');
        expect(button).not.toBeDisabled();
    });
});

