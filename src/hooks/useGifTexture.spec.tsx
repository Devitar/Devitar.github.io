import { render, screen, waitFor } from '@testing-library/react';

// Use vi.hoisted to define mocks before vi.mock hoisting
const { MockCanvasTexture, mockDispose } = vi.hoisted(() => {
  const mockDispose = vi.fn();
  class MockCanvasTexture {
    minFilter = null;
    magFilter = null;
    needsUpdate = false;
    dispose = mockDispose;
  }
  return { MockCanvasTexture, mockDispose };
});

// Mock required packages

vi.mock('three', () => ({
  CanvasTexture: MockCanvasTexture,
  LinearFilter: 'LinearFilter',
  NearestFilter: 'NearestFilter',
}));

vi.mock('@react-three/fiber', () => ({
  useFrame: vi.fn(),
}));

vi.mock('gifuct-js', () => ({
  parseGIF: vi.fn().mockReturnValue({}),
  decompressFrames: vi.fn().mockReturnValue([
    {
      dims: { width: 100, height: 100 },
      patch: new Uint8Array(100 * 100 * 4),
    },
  ]),
}));

// import only after mocks are set up
import useGifTexture from './useGifTexture';
import { useFrame } from '@react-three/fiber';
import { parseGIF, decompressFrames } from 'gifuct-js';

function TestComponent({ url, interval }: { url: string; interval?: number }) {
  const texture = useGifTexture(url, interval);
  return <div data-testid='gif-status'>{texture ? 'loaded' : 'null'}</div>;
}

describe('useGifTexture', () => {
  const mockArrayBuffer = new ArrayBuffer(8);

  beforeEach(() => {
    vi.clearAllMocks();

    globalThis.fetch = vi.fn().mockResolvedValue({
      arrayBuffer: vi.fn().mockResolvedValue(mockArrayBuffer),
    });

    const mockContext = {
      putImageData: vi.fn(),
    };

    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(mockContext);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns null initially', () => {
    render(<TestComponent url='/test.gif' />);
    expect(screen.getByTestId('gif-status').textContent).toBe('null');
  });

  it('fetches the GIF from the provided URL', async () => {
    render(<TestComponent url='/test.gif' />);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        '/test.gif',
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
    });
  });

  it('parses the GIF data', async () => {
    render(<TestComponent url='/test.gif' />);
    await waitFor(() => {
      expect(parseGIF).toHaveBeenCalled();
      expect(decompressFrames).toHaveBeenCalled();
    });
  });

  it('creates a texture when frames are loaded', async () => {
    const { unmount } = render(<TestComponent url='/test.gif' />);
    await waitFor(() => {
      expect(screen.getByTestId('gif-status').textContent).toBe('loaded');
    });
    unmount();
  });

  it('registers a useFrame callback for animation', () => {
    render(<TestComponent url='/test.gif' />);
    expect(useFrame).toHaveBeenCalled();
  });

  it('disposes texture on unmount', async () => {
    const { unmount } = render(<TestComponent url='/test.gif' />);
    await waitFor(() => {
      expect(screen.getByTestId('gif-status').textContent).toBe('loaded');
    });
    unmount();
    expect(mockDispose).toHaveBeenCalled();
  });

  it('handles fetch errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    render(<TestComponent url='/test.gif' />);
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
    consoleSpy.mockRestore();
  });

  it('accepts custom interval parameter', () => {
    render(<TestComponent url='/test.gif' interval={200} />);
    expect(useFrame).toHaveBeenCalled();
  });
});
