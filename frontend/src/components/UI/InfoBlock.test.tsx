import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import InfoBlock from './InfoBlock';
describe('InfoBlock', () => {
    it('renders the message correctly', () => {
        render(<InfoBlock message="This is an info message" />);
        expect(screen.getByText('This is an info message')).toBeInTheDocument();
    });
    it('has correct styling classes', () => {
        const { container } = render(<InfoBlock message="Test message" />);
        const infoDiv = container.querySelector('.bg-blue-100');
        expect(infoDiv).toBeInTheDocument();
        expect(infoDiv).toHaveClass('border-blue-300');
        expect(infoDiv).toHaveClass('text-blue-700');
        expect(infoDiv).toHaveClass('rounded-md');
    });
    it('renders the info icon', () => {
        const { container } = render(<InfoBlock message="Test" />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('w-8', 'h-8', 'mb-2');
    });
    it('displays message in a span element', () => {
        const { container } = render(<InfoBlock message="Important information" />);
        const span = container.querySelector('span');
        expect(span).toHaveTextContent('Important information');
    });
    it('renders with empty message', () => {
        render(<InfoBlock message="" />);
        const span = screen.getByText('', { selector: 'span' });
        expect(span).toBeInTheDocument();
    });
    it('renders with long message', () => {
        const longMessage = 'This is a very long information message that contains multiple sentences. It should be displayed correctly without any issues. The component should handle long text gracefully.';
        render(<InfoBlock message={longMessage} />);
        expect(screen.getByText(longMessage)).toBeInTheDocument();
    });
    it('has proper flex layout structure', () => {
        const { container } = render(<InfoBlock message="Test" />);
        const infoDiv = container.firstChild as HTMLElement;
        expect(infoDiv).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center');
    });
    it('has proper padding', () => {
        const { container } = render(<InfoBlock message="Test" />);
        const infoDiv = container.firstChild as HTMLElement;
        expect(infoDiv).toHaveClass('p-6');
    });
});
