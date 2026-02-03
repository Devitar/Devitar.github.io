import { render, screen, act } from '@testing-library/react';
import useIsMobile from './useIsMobile';

function TestComponent() {
  const isMobile = useIsMobile();
  return <div data-testid='is-mobile'>{String(isMobile)}</div>;
}

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      value: originalInnerWidth,
      writable: true,
    });
  });

  it('returns true when width < 768', () => {
    Object.defineProperty(window, 'innerWidth', { value: 500, writable: true });
    render(<TestComponent />);
    expect(screen.getByTestId('is-mobile').textContent).toBe('true');
  });

  it('returns false when width >= 768', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    render(<TestComponent />);
    expect(screen.getByTestId('is-mobile').textContent).toBe('false');
  });

  it('updates on window resize', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    render(<TestComponent />);

    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 500, writable: true });
      window.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByTestId('is-mobile').textContent).toBe('true');
  });
});
