import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal', () => {
    let modalRoot: HTMLElement;

    beforeEach(() => {
        // Create modal root element for portal
        modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal');
        document.body.appendChild(modalRoot);

        // Mock HTMLDialogElement methods
        HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
            this.open = true;
        });
        HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
            this.open = false;
        });
    });

    afterEach(() => {
        // Clean up
        if (modalRoot && modalRoot.parentNode) {
            modalRoot.parentNode.removeChild(modalRoot);
        }
        vi.restoreAllMocks();
    });

    it('renders modal with children', () => {
        render(
            <Modal>
                <div>Modal Content</div>
            </Modal>
        );

        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('calls showModal when mounted', async () => {
        const showModalSpy = vi.spyOn(HTMLDialogElement.prototype, 'showModal');

        render(
            <Modal>
                <div>Test</div>
            </Modal>
        );

        await waitFor(() => {
            expect(showModalSpy).toHaveBeenCalled();
        });
    });

    it('renders modal in portal element', () => {
        render(
            <Modal>
                <div>Portal Test</div>
            </Modal>
        );

        const modalElement = modalRoot.querySelector('dialog');
        expect(modalElement).toBeInTheDocument();
        expect(modalElement).toContainHTML('Portal Test');
    });

    it('renders modal in document.body if modal element does not exist', () => {
        // Remove the modal root
        modalRoot.parentNode?.removeChild(modalRoot);

        render(
            <Modal>
                <div>Fallback Test</div>
            </Modal>
        );

        const dialog = document.querySelector('dialog');
        expect(dialog).toBeInTheDocument();
        expect(screen.getByText('Fallback Test')).toBeInTheDocument();
    });

    it('calls close method on unmount', () => {
        const closeSpy = vi.spyOn(HTMLDialogElement.prototype, 'close');

        const { unmount } = render(
            <Modal>
                <div>Test</div>
            </Modal>
        );

        unmount();

        expect(closeSpy).toHaveBeenCalled();
    });

    it('calls onClose when clicking outside modal (backdrop)', async () => {
        const handleClose = vi.fn();

        render(
            <Modal onClose={handleClose}>
                <div>Modal Content</div>
            </Modal>
        );

        const dialog = screen.getByRole('dialog');

        // Mock getBoundingClientRect to simulate dialog dimensions
        vi.spyOn(dialog, 'getBoundingClientRect').mockReturnValue({
            left: 100,
            right: 400,
            top: 100,
            bottom: 300,
            width: 300,
            height: 200,
            x: 100,
            y: 100,
            toJSON: () => {},
        });

        // Click outside the modal (backdrop) using fireEvent for coordinates
        fireEvent.click(dialog, { clientX: 50, clientY: 50 });

        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when clicking inside modal content', async () => {
        const handleClose = vi.fn();
        const user = userEvent.setup();

        render(
            <Modal onClose={handleClose}>
                <div data-testid="modal-content">Modal Content</div>
            </Modal>
        );

        const modalContent = screen.getByTestId('modal-content');

        // Click on the content inside the modal (not the backdrop)
        await user.click(modalContent);

        expect(handleClose).not.toHaveBeenCalled();
    });

    it('does not throw error when onClose is not provided and backdrop is clicked', async () => {
        render(
            <Modal>
                <div>Modal Content</div>
            </Modal>
        );

        const dialog = screen.getByRole('dialog');

        vi.spyOn(dialog, 'getBoundingClientRect').mockReturnValue({
            left: 100,
            right: 400,
            top: 100,
            bottom: 300,
            width: 300,
            height: 200,
            x: 100,
            y: 100,
            toJSON: () => {},
        });

        // Click outside - should not throw error
        expect(() => {
            fireEvent.click(dialog, { clientX: 50, clientY: 50 });
        }).not.toThrow();
    });

    it('renders complex children correctly', () => {
        render(
            <Modal>
                <div>
                    <h2>Title</h2>
                    <p>Description</p>
                    <button>Close</button>
                </div>
            </Modal>
        );

        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });

    it('applies correct CSS class to dialog element', () => {
        render(
            <Modal>
                <div>Test</div>
            </Modal>
        );

        const dialog = screen.getByRole('dialog');
        expect(dialog.className).toContain('modal');
    });

    it('handles multiple modals correctly', () => {
        const { unmount: unmount1 } = render(
            <Modal>
                <div>First Modal</div>
            </Modal>
        );

        expect(screen.getByText('First Modal')).toBeInTheDocument();

        unmount1();

        render(
            <Modal>
                <div>Second Modal</div>
            </Modal>
        );

        expect(screen.getByText('Second Modal')).toBeInTheDocument();
        expect(screen.queryByText('First Modal')).not.toBeInTheDocument();
    });

    it('handles backdrop click on edges correctly', () => {
        const handleClose = vi.fn();

        render(
            <Modal onClose={handleClose}>
                <div>Modal Content</div>
            </Modal>
        );

        const dialog = screen.getByRole('dialog');

        vi.spyOn(dialog, 'getBoundingClientRect').mockReturnValue({
            left: 100,
            right: 400,
            top: 100,
            bottom: 300,
            width: 300,
            height: 200,
            x: 100,
            y: 100,
            toJSON: () => {},
        });

        // Click on left edge (outside)
        fireEvent.click(dialog, { clientX: 99, clientY: 200 });
        expect(handleClose).toHaveBeenCalledTimes(1);

        // Click on right edge (outside)
        fireEvent.click(dialog, { clientX: 401, clientY: 200 });
        expect(handleClose).toHaveBeenCalledTimes(2);

        // Click on top edge (outside)
        fireEvent.click(dialog, { clientX: 200, clientY: 99 });
        expect(handleClose).toHaveBeenCalledTimes(3);

        // Click on bottom edge (outside)
        fireEvent.click(dialog, { clientX: 200, clientY: 301 });
        expect(handleClose).toHaveBeenCalledTimes(4);
    });
});

