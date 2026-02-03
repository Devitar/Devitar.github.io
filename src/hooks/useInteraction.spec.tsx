import { render, screen } from '@testing-library/react';
import { useInteraction } from './useInteraction';
import { AppContext } from '~/context/AppContext';
import type { ReactNode } from 'react';

function TestComponent() {
  const val = useInteraction();
  return <div data-testid='interaction'>{String(val)}</div>;
}

const createProvider =
  (isBookOpen: boolean) =>
  ({ children }: { children: ReactNode }) => (
    <AppContext.Provider
      value={{
        get: {
          isFireOn: true,
          isNightTime: true,
          isBookOpen,
          isFlashlightOn: true,
          isMuted: false,
        },
        set: {
          setIsFireOn: vi.fn(),
          setIsNightTime: vi.fn(),
          setIsBookOpen: vi.fn(),
          setIsFlashlightOn: vi.fn(),
          setIsMuted: vi.fn(),
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );

describe('useInteraction', () => {
  it('returns true when book is open', () => {
    render(<TestComponent />, { wrapper: createProvider(true) });
    expect(screen.getByTestId('interaction').textContent).toBe('true');
  });

  it('returns false when book is closed', () => {
    render(<TestComponent />, { wrapper: createProvider(false) });
    expect(screen.getByTestId('interaction').textContent).toBe('false');
  });

  it('uses default context value when no provider', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('interaction').textContent).toBe('false');
  });
});
