import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Button from './Button';

const ButtonWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
);

describe('Button', () => {
    it('renders the label correctly', () => {
        render(<Button label="Click me" />, { wrapper: ButtonWrapper });
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders a button by default', () => {
        render(<Button label="Test" />, { wrapper: ButtonWrapper });
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('type', 'button');
    });

    it('renders a NavLink when as="link"', () => {
        render(<Button as="link" to="/test" label="Link" />, { wrapper: ButtonWrapper });
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/test');
    });

    it('applies appropriate CSS classes', () => {
        render(<Button label="Test" outlineButtonLink />, { wrapper: ButtonWrapper });
        const button = screen.getByRole('button');
        expect(button.className).toContain('btnOutline');
    });

    it('handles click correctly', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<Button label="Click" onClick={handleClick} />, { wrapper: ButtonWrapper });
        await user.click(screen.getByRole('button'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disables the button when disabled=true', () => {
        render(<Button label="Disabled" disabled />, { wrapper: ButtonWrapper });
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('renders children', () => {
        render(
            <Button label="Test">
                <span>Child content</span>
            </Button>,
            { wrapper: ButtonWrapper }
        );
        expect(screen.getByText('Child content')).toBeInTheDocument();
    });
});
