import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input', () => {
    it('renders an input field by default', () => {
        render(<Input id="test-input" />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('id', 'test-input');
        expect(input).toHaveAttribute('name', 'test-input');
    });

    it('renders a textarea when textarea prop is true', () => {
        render(<Input id="test-textarea" textarea={true} />);
        const textarea = screen.getByRole('textbox');
        expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('displays label when provided', () => {
        render(<Input id="email" label="Email Address" />);
        const label = screen.getByLabelText('Email Address');
        expect(label).toBeInTheDocument();
        expect(screen.getByText('Email Address')).toBeInTheDocument();
    });

    it('does not render label when not provided', () => {
        render(<Input id="test" />);
        const labels = document.querySelectorAll('label');
        expect(labels.length).toBe(0);
    });

    it('displays error message when error prop is provided', () => {
        render(<Input id="email" error="Email is required" />);
        expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    it('applies error styling when error exists', () => {
        render(<Input id="email" error="Invalid email" />);
        const input = screen.getByRole('textbox');
        expect(input.className).toContain('border-red-500');
        expect(input.className).toContain('border-2');
    });

    it('applies custom className to wrapper div', () => {
        const { container } = render(<Input id="test" className="custom-class" />);
        const wrapper = container.querySelector('.custom-class');
        expect(wrapper).toBeInTheDocument();
    });

    it('handles user input correctly', async () => {
        const user = userEvent.setup();
        render(<Input id="username" />);
        const input = screen.getByRole('textbox') as HTMLInputElement;

        await user.type(input, 'John Doe');
        expect(input.value).toBe('John Doe');
    });

    it('accepts additional HTML input attributes', () => {
        render(
            <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                disabled
            />
        );
        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('type', 'email');
        expect(input).toHaveAttribute('placeholder', 'Enter your email');
        expect(input).toBeRequired();
        expect(input).toBeDisabled();
    });

    it('accepts additional HTML textarea attributes', () => {
        render(
            <Input
                id="message"
                textarea={true}
                placeholder="Enter your message"
                rows={5}
                maxLength={500}
            />
        );
        const textarea = screen.getByRole('textbox');
        expect(textarea).toHaveAttribute('placeholder', 'Enter your message');
        expect(textarea).toHaveAttribute('rows', '5');
        expect(textarea).toHaveAttribute('maxlength', '500');
    });

    it('handles onChange event', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();

        render(<Input id="test" onChange={handleChange} />);
        const input = screen.getByRole('textbox');

        await user.type(input, 'a');
        expect(handleChange).toHaveBeenCalled();
    });

    it('renders textarea with error message', () => {
        render(
            <Input
                id="description"
                textarea={true}
                label="Description"
                error="Description is too short"
            />
        );

        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Description is too short')).toBeInTheDocument();
        const textarea = screen.getByRole('textbox');
        expect(textarea.className).toContain('border-red-500');
    });

    it('maintains value when controlled', async () => {
        const { rerender } = render(<Input id="test" value="initial" onChange={() => {}} />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.value).toBe('initial');

        rerender(<Input id="test" value="updated" onChange={() => {}} />);
        expect(input.value).toBe('updated');
    });
});

