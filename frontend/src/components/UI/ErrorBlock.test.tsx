import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBlock from './ErrorBlock';

describe('ErrorBlock', () => {
    it('renders the title correctly', () => {
        render(<ErrorBlock title="Error!" message="Something went wrong" />);
        expect(screen.getByText('Error!')).toBeInTheDocument();
    });

    it('renders the message correctly', () => {
        render(<ErrorBlock title="Failed" message="The operation could not be completed" />);
        expect(screen.getByText('The operation could not be completed')).toBeInTheDocument();
    });

    it('has correct styling classes', () => {
        const { container } = render(<ErrorBlock title="Test" message="Message" />);
        const errorDiv = container.querySelector('.bg-red-100');

        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv).toHaveClass('border-red-300');
        expect(errorDiv).toHaveClass('text-red-700');
        expect(errorDiv).toHaveClass('rounded-md');
    });

    it('renders the error icon', () => {
        const { container } = render(<ErrorBlock title="Test" message="Message" />);
        const svg = container.querySelector('svg');

        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('w-8', 'h-8', 'mb-2', 'text-red-500');
    });

    it('displays both title and message', () => {
        render(<ErrorBlock title="Oops!" message="An unexpected error occurred" />);

        expect(screen.getByText('Oops!')).toBeInTheDocument();
        expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
    });

    it('renders with empty title and message', () => {
        render(<ErrorBlock title="" message="" />);
        const spans = screen.getAllByText('', { selector: 'span' });

        expect(spans.length).toBeGreaterThan(0);
    });

    it('has proper flex layout structure', () => {
        const { container } = render(<ErrorBlock title="Test" message="Message" />);
        const errorDiv = container.firstChild as HTMLElement;

        expect(errorDiv).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center');
    });

    it('has proper padding and spacing', () => {
        const { container } = render(<ErrorBlock title="Test" message="Message" />);
        const errorDiv = container.firstChild as HTMLElement;

        expect(errorDiv).toHaveClass('p-6', 'my-8');
    });

    it('renders with long title and message', () => {
        const longTitle = 'This is a very long error title';
        const longMessage = 'This is a very long error message that contains multiple sentences and explains what went wrong.';

        render(<ErrorBlock title={longTitle} message={longMessage} />);

        expect(screen.getByText(longTitle)).toBeInTheDocument();
        expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('renders error icon with correct SVG path', () => {
        const { container } = render(<ErrorBlock title="Test" message="Message" />);
        const svg = container.querySelector('svg');
        const path = svg?.querySelector('path');

        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute('d', 'M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z');
    });
});

