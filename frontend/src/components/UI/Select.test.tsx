import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from './Select';
import type { SelectOptionType } from '../../types/selectType';

const mockOptions: SelectOptionType[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
];

describe('Select', () => {
    it('renders a select element', () => {
        render(<Select id="test-select" options={mockOptions} />);
        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();
        expect(select).toHaveAttribute('id', 'test-select');
        expect(select).toHaveAttribute('name', 'test-select');
    });

    it('renders all options correctly', () => {
        render(<Select id="test" options={mockOptions} />);
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(3);
        expect(options[0]).toHaveTextContent('Option 1');
        expect(options[1]).toHaveTextContent('Option 2');
        expect(options[2]).toHaveTextContent('Option 3');
    });

    it('sets correct values for options', () => {
        render(<Select id="test" options={mockOptions} />);
        const options = screen.getAllByRole('option') as HTMLOptionElement[];
        expect(options[0]).toHaveValue('option1');
        expect(options[1]).toHaveValue('option2');
        expect(options[2]).toHaveValue('option3');
    });

    it('displays label when provided', () => {
        render(<Select id="country" label="Select Country" options={mockOptions} />);
        const label = screen.getByLabelText('Select Country');
        expect(label).toBeInTheDocument();
        expect(screen.getByText('Select Country')).toBeInTheDocument();
    });

    it('does not render label when not provided', () => {
        render(<Select id="test" options={mockOptions} />);
        const labels = document.querySelectorAll('label');
        expect(labels.length).toBe(0);
    });

    it('displays error message when error prop is provided', () => {
        render(<Select id="country" options={mockOptions} error="Country is required" />);
        expect(screen.getByText('Country is required')).toBeInTheDocument();
    });

    it('applies error styling when error exists', () => {
        render(<Select id="country" options={mockOptions} error="Invalid selection" />);
        const select = screen.getByRole('combobox');
        expect(select.className).toContain('border-red-500');
        expect(select.className).toContain('border-2');
    });

    it('applies custom className to wrapper div', () => {
        const { container } = render(
            <Select id="test" options={mockOptions} className="custom-class" />
        );
        const wrapper = container.querySelector('.custom-class');
        expect(wrapper).toBeInTheDocument();
    });

    it('handles user selection correctly', async () => {
        const user = userEvent.setup();
        render(<Select id="country" options={mockOptions} />);
        const select = screen.getByRole('combobox') as HTMLSelectElement;

        await user.selectOptions(select, 'option2');
        expect(select.value).toBe('option2');
    });

    it('accepts additional HTML select attributes', () => {
        render(
            <Select
                id="country"
                options={mockOptions}
                required
                disabled
            />
        );
        const select = screen.getByRole('combobox');
        expect(select).toBeRequired();
        expect(select).toBeDisabled();
    });

    it('handles multiple attribute correctly', () => {
        render(
            <Select
                id="country"
                options={mockOptions}
                multiple
            />
        );
        // When multiple is set, the role changes from 'combobox' to 'listbox'
        const select = screen.getByRole('listbox');
        expect(select).toHaveAttribute('multiple');
    });

    it('handles onChange event', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();

        render(<Select id="test" options={mockOptions} onChange={handleChange} />);
        const select = screen.getByRole('combobox');

        await user.selectOptions(select, 'option3');
        expect(handleChange).toHaveBeenCalled();
    });

    it('renders with default selected value', () => {
        render(
            <Select
                id="country"
                options={mockOptions}
                defaultValue="option2"
            />
        );
        const select = screen.getByRole('combobox') as HTMLSelectElement;
        expect(select.value).toBe('option2');
    });

    it('renders with controlled value', () => {
        const { rerender } = render(
            <Select
                id="test"
                options={mockOptions}
                value="option1"
                onChange={() => {}}
            />
        );
        const select = screen.getByRole('combobox') as HTMLSelectElement;
        expect(select.value).toBe('option1');

        rerender(
            <Select
                id="test"
                options={mockOptions}
                value="option3"
                onChange={() => {}}
            />
        );
        expect(select.value).toBe('option3');
    });

    it('renders empty select when options array is empty', () => {
        render(<Select id="test" options={[]} />);
        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();
        const options = screen.queryAllByRole('option');
        expect(options).toHaveLength(0);
    });

    it('combines label and error correctly', () => {
        render(
            <Select
                id="country"
                label="Country"
                options={mockOptions}
                error="Please select a valid country"
            />
        );

        expect(screen.getByText('Country')).toBeInTheDocument();
        expect(screen.getByText('Please select a valid country')).toBeInTheDocument();
        const select = screen.getByRole('combobox');
        expect(select.className).toContain('border-red-500');
    });

    it('handles options with duplicate labels but different values', () => {
        const duplicateOptions: SelectOptionType[] = [
            { value: 'val1', label: 'Same Label' },
            { value: 'val2', label: 'Same Label' },
        ];

        render(<Select id="test" options={duplicateOptions} />);
        const options = screen.getAllByRole('option') as HTMLOptionElement[];
        expect(options).toHaveLength(2);
        expect(options[0]).toHaveValue('val1');
        expect(options[1]).toHaveValue('val2');
    });
});

