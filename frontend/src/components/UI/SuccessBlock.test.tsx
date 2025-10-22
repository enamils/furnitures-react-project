import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SuccessBlock from './SuccessBlock';

describe('SuccessBlock', () => {
    it('renders the title correctly', () => {
        render(<SuccessBlock title="Success!" message="Operation completed" />);
        expect(screen.getByText('Success!')).toBeInTheDocument();
    });

    it('renders the message correctly', () => {
        render(<SuccessBlock title="Done" message="Your action was successful" />);
        expect(screen.getByText('Your action was successful')).toBeInTheDocument();
    });

    it('has correct styling classes', () => {
        const { container } = render(<SuccessBlock title="Test" message="Message" />);
        const successDiv = container.querySelector('.bg-green-100');

        expect(successDiv).toBeInTheDocument();
        expect(successDiv).toHaveClass('border-green-300');
        expect(successDiv).toHaveClass('text-green-700');
        expect(successDiv).toHaveClass('rounded-md');
    });

    it('renders the success icon', () => {
        const { container } = render(<SuccessBlock title="Test" message="Message" />);
        const svg = container.querySelector('svg');

        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('w-8', 'h-8', 'mb-2', 'text-green-500');
    });

    it('displays both title and message', () => {
        render(<SuccessBlock title="Congratulations" message="You have completed the task" />);

        expect(screen.getByText('Congratulations')).toBeInTheDocument();
        expect(screen.getByText('You have completed the task')).toBeInTheDocument();
    });

    it('renders with empty title and message', () => {
        render(<SuccessBlock title="" message="" />);
        const spans = screen.getAllByText('', { selector: 'span' });

        expect(spans.length).toBeGreaterThan(0);
    });

    it('has proper flex layout structure', () => {
        const { container } = render(<SuccessBlock title="Test" message="Message" />);
        const successDiv = container.firstChild as HTMLElement;

        expect(successDiv).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center');
    });

    it('has proper padding and spacing', () => {
        const { container } = render(<SuccessBlock title="Test" message="Message" />);
        const successDiv = container.firstChild as HTMLElement;

        expect(successDiv).toHaveClass('p-6', 'my-8');
    });

    it('renders with long title and message', () => {
        const longTitle = 'This is a very long success title';
        const longMessage = 'This is a very long success message that contains multiple sentences.';

        render(<SuccessBlock title={longTitle} message={longMessage} />);

        expect(screen.getByText(longTitle)).toBeInTheDocument();
        expect(screen.getByText(longMessage)).toBeInTheDocument();
    });
});

