import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from './Accordion';

describe('Accordion', () => {
    it('renders the title correctly', () => {
        render(
            <Accordion title="Test Title">
                <p>Test content</p>
            </Accordion>
        );
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders children content', () => {
        render(
            <Accordion title="Title">
                <p>Child content</p>
            </Accordion>
        );
        expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('is closed by default', () => {
        render(
            <Accordion title="Title">
                <p>Content</p>
            </Accordion>
        );
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('can be opened by default when defaultOpen is true', () => {
        render(
            <Accordion title="Title" defaultOpen={true}>
                <p>Content</p>
            </Accordion>
        );
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('toggles open and closed state when clicked', async () => {
        const user = userEvent.setup();

        render(
            <Accordion title="Title">
                <p>Content</p>
            </Accordion>
        );

        const button = screen.getByRole('button');

        // Initially closed
        expect(button).toHaveAttribute('aria-expanded', 'false');

        // Click to open
        await user.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'true');

        // Click to close
        await user.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('applies custom className', () => {
        const { container } = render(
            <Accordion title="Title" className="custom-class">
                <p>Content</p>
            </Accordion>
        );
        const accordionDiv = container.querySelector('.custom-class');
        expect(accordionDiv).toBeInTheDocument();
    });

    it('has correct accessibility attributes', () => {
        render(
            <Accordion title="Title">
                <p>Content</p>
            </Accordion>
        );

        const button = screen.getByRole('button');
        const region = screen.getByRole('region', { hidden: true });

        expect(button).toHaveAttribute('aria-controls');
        expect(button).toHaveAttribute('aria-expanded');
        expect(region).toHaveAttribute('aria-labelledby');
        expect(region).toHaveAttribute('aria-hidden');
    });

    it('links button and content with proper ARIA attributes', () => {
        render(
            <Accordion title="Title">
                <p>Content</p>
            </Accordion>
        );

        const button = screen.getByRole('button');
        const region = screen.getByRole('region', { hidden: true });

        const contentId = button.getAttribute('aria-controls');
        const headingId = region.getAttribute('aria-labelledby');

        expect(region.id).toBe(contentId);
        expect(button.id).toBe(headingId);
    });

    it('updates data-state-accordion attribute based on open state', async () => {
        const user = userEvent.setup();
        const { container } = render(
            <Accordion title="Title">
                <p>Content</p>
            </Accordion>
        );

        const accordionDiv = container.firstChild as HTMLElement;

        // Initially closed
        expect(accordionDiv).toHaveAttribute('data-state-accordion', 'closed');

        // Click to open
        const button = screen.getByRole('button');
        await user.click(button);
        expect(accordionDiv).toHaveAttribute('data-state-accordion', 'open');
    });

    it('uses custom id when provided', () => {
        render(
            <Accordion title="Title" id="custom-id">
                <p>Content</p>
            </Accordion>
        );

        const button = screen.getByRole('button');
        expect(button.id).toBe('accordion-heading-custom-id');
    });

    it('renders complex title content', () => {
        render(
            <Accordion title={<span data-testid="custom-title">Custom Title Element</span>}>
                <p>Content</p>
            </Accordion>
        );

        expect(screen.getByTestId('custom-title')).toBeInTheDocument();
        expect(screen.getByText('Custom Title Element')).toBeInTheDocument();
    });
});

