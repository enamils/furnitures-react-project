import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Slider from './Slider';
import type { SlideType } from '../../types/slideType';

const mockSlides: SlideType[] = [
    {
        content: 'First slide content',
        image: '/images/person_1.jpg',
        name: 'John Doe',
        position: 'CEO'
    },
    {
        content: 'Second slide content',
        image: '/images/person_2.jpg',
        name: 'Jane Smith',
        position: 'CTO'
    },
    {
        content: 'Third slide content',
        image: '/images/person_3.jpg',
        name: 'Bob Johnson',
        position: 'Designer'
    }
];

describe('Slider', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders the title correctly', () => {
        render(<Slider slides={mockSlides} />);
        expect(screen.getByText('Testimonials')).toBeInTheDocument();
    });

    it('renders all slides', () => {
        render(<Slider slides={mockSlides} />);

        expect(screen.getByText(/First slide content/i)).toBeInTheDocument();
        expect(screen.getByText(/Second slide content/i)).toBeInTheDocument();
        expect(screen.getByText(/Third slide content/i)).toBeInTheDocument();
    });

    it('renders navigation buttons', () => {
        render(<Slider slides={mockSlides} />);

        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(5);
    });

    it('renders correct number of slide indicators', () => {
        render(<Slider slides={mockSlides} />);

        const indicators = screen.getAllByLabelText(/Go to slide \d+/);
        expect(indicators).toHaveLength(mockSlides.length);
    });

    it('displays first slide by default', () => {
        const { container } = render(<Slider slides={mockSlides} />);

        const sliderContainer = container.querySelector('.flex.transition-transform');
        expect(sliderContainer).toHaveStyle({ transform: 'translateX(-0%)' });
    });

    it('navigates to next slide when next button is clicked', async () => {
        vi.useRealTimers();
        const user = userEvent.setup();
        const { container } = render(<Slider slides={mockSlides} />);

        const buttons = screen.getAllByRole('button');
        const nextButton = buttons.find(button => button.textContent?.includes('→'));

        await user.click(nextButton!);

        const sliderContainer = container.querySelector('.flex.transition-transform');
        expect(sliderContainer).toHaveStyle({ transform: 'translateX(-100%)' });
        vi.useFakeTimers();
    });

    it('navigates to previous slide when previous button is clicked', async () => {
        vi.useRealTimers();
        const user = userEvent.setup();
        const { container } = render(<Slider slides={mockSlides} />);

        const buttons = screen.getAllByRole('button');
        const prevButton = buttons.find(button => button.textContent?.includes('←'));

        await user.click(prevButton!);

        const sliderContainer = container.querySelector('.flex.transition-transform');
        expect(sliderContainer).toHaveStyle({ transform: 'translateX(-200%)' });
        vi.useFakeTimers();
    });

    it('navigates to specific slide when indicator is clicked', async () => {
        vi.useRealTimers();
        const user = userEvent.setup();
        const { container } = render(<Slider slides={mockSlides} />);

        const secondIndicator = screen.getByLabelText('Go to slide 2');
        await user.click(secondIndicator);

        const sliderContainer = container.querySelector('.flex.transition-transform');
        expect(sliderContainer).toHaveStyle({ transform: 'translateX(-100%)' });
        vi.useFakeTimers();
    });

    it('wraps to first slide when next is clicked on last slide', async () => {
        vi.useRealTimers();
        const user = userEvent.setup();
        const { container } = render(<Slider slides={mockSlides} />);

        const buttons = screen.getAllByRole('button');
        const nextButton = buttons.find(button => button.textContent?.includes('→'));

        await user.click(nextButton!);
        await user.click(nextButton!);
        await user.click(nextButton!);

        const sliderContainer = container.querySelector('.flex.transition-transform');
        expect(sliderContainer).toHaveStyle({ transform: 'translateX(-0%)' });
        vi.useFakeTimers();
    });


    it('renders slide items with correct props', () => {
        render(<Slider slides={mockSlides} />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('CEO')).toBeInTheDocument();
        expect(screen.getByAltText('John Doe')).toHaveAttribute('src', '/images/person_1.jpg');
    });

    it('highlights active slide indicator', () => {
        const { container } = render(<Slider slides={mockSlides} />);

        const indicators = container.querySelectorAll('.w-2.h-2.rounded-full');

        expect(indicators[0]).toHaveClass('bg-[color:var(--primary)]');
        expect(indicators[1]).toHaveClass('bg-[color:var(--gray-lighter)]');
        expect(indicators[2]).toHaveClass('bg-[color:var(--gray-lighter)]');
    });

    it('updates highlighted indicator when slide changes', async () => {
        vi.useRealTimers();
        const user = userEvent.setup();
        const { container } = render(<Slider slides={mockSlides} />);

        const nextButton = screen.getAllByRole('button').find(button =>
            button.textContent?.includes('→')
        );

        await user.click(nextButton!);

        const indicators = container.querySelectorAll('.w-2.h-2.rounded-full');

        expect(indicators[0]).toHaveClass('bg-[color:var(--gray-lighter)]');
        expect(indicators[1]).toHaveClass('bg-[color:var(--primary)]');
        expect(indicators[2]).toHaveClass('bg-[color:var(--gray-lighter)]');
        vi.useFakeTimers();
    });

    it('has proper accessibility labels on indicator buttons', () => {
        render(<Slider slides={mockSlides} />);

        expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument();
        expect(screen.getByLabelText('Go to slide 2')).toBeInTheDocument();
        expect(screen.getByLabelText('Go to slide 3')).toBeInTheDocument();
    });

    it('handles single slide correctly', () => {
        const singleSlide = [mockSlides[0]];
        const { container } = render(<Slider slides={singleSlide} />);

        const sliderContainer = container.querySelector('.flex.transition-transform');
        expect(sliderContainer).toHaveStyle({ transform: 'translateX(-0%)' });

        expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument();
    });

    it('cleans up interval on unmount', () => {
        const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

        const { unmount } = render(<Slider slides={mockSlides} />);

        unmount();

        expect(clearIntervalSpy).toHaveBeenCalled();

        clearIntervalSpy.mockRestore();
    });
});

