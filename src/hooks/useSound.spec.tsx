import { render, act } from '@testing-library/react';
import { useSound, useSoundOnChange } from './useSound';
import { useEffect } from 'react';

// Mock HTMLAudioElement
const mockPlay = vi.fn().mockResolvedValue(undefined);

class MockAudio {
  play = mockPlay;
  currentTime = 0;
  volume = 1;

  constructor(_src?: string) {}
}

vi.stubGlobal('Audio', MockAudio);

// Helpers to capture hook return
function TestUseSound({
  path,
  opts,
  onReady,
}: {
  path?: string;
  opts?: any;
  onReady?: (v: any) => void;
}) {
  const api = useSound(path, opts);
  useEffect(() => {
    onReady?.(api);
  }, [api, onReady]);
  return null;
}

function TestUseSoundOnChange({ path, value, opts }: { path: string; value: any; opts?: any }) {
  useSoundOnChange(path, value, opts);
  return null;
}

describe('useSound', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates audio element with sound path', () => {
    let captured: any = null;
    render(<TestUseSound path='/test.mp3' onReady={(v) => (captured = v)} />);
    expect(typeof captured.play).toBe('function');
  });

  it('does not create audio element without sound path', () => {
    let captured: any = null;
    render(<TestUseSound path={undefined} onReady={(v) => (captured = v)} />);
    expect(typeof captured.play).toBe('function');
  });

  it('plays audio when play is called', () => {
    let captured: any = null;
    render(<TestUseSound path='/test.mp3' onReady={(v) => (captured = v)} />);

    act(() => {
      captured.play();
    });

    expect(mockPlay).toHaveBeenCalled();
  });

  it('does not play when muted', () => {
    let captured: any = null;
    render(
      <TestUseSound path='/test.mp3' opts={{ isMuted: true }} onReady={(v) => (captured = v)} />
    );

    act(() => {
      captured.play();
    });

    expect(mockPlay).not.toHaveBeenCalled();
  });

  it('does not play without sound path', () => {
    let captured: any = null;
    render(<TestUseSound path={undefined} onReady={(v) => (captured = v)} />);

    act(() => {
      captured.play();
    });

    expect(mockPlay).not.toHaveBeenCalled();
  });
});

describe('useSoundOnChange', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not play on initial render', () => {
    render(<TestUseSoundOnChange path='/test.mp3' value='initial' />);
    expect(mockPlay).not.toHaveBeenCalled();
  });

  it('plays when value changes', () => {
    const { rerender } = render(<TestUseSoundOnChange path='/test.mp3' value='first' />);
    expect(mockPlay).not.toHaveBeenCalled();

    rerender(<TestUseSoundOnChange path='/test.mp3' value='second' />);
    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it('does not play when value stays the same', () => {
    const { rerender } = render(<TestUseSoundOnChange path='/test.mp3' value='same' />);
    rerender(<TestUseSoundOnChange path='/test.mp3' value='same' />);
    expect(mockPlay).not.toHaveBeenCalled();
  });

  it('respects isMuted option', () => {
    const { rerender } = render(
      <TestUseSoundOnChange path='/test.mp3' value='first' opts={{ isMuted: true }} />
    );
    rerender(<TestUseSoundOnChange path='/test.mp3' value='second' opts={{ isMuted: true }} />);
    expect(mockPlay).not.toHaveBeenCalled();
  });

  it('uses custom playWhen condition', () => {
    const playWhen = vi.fn().mockReturnValue(false);
    const { rerender } = render(
      <TestUseSoundOnChange path='/test.mp3' value={1} opts={{ playWhen }} />
    );
    rerender(<TestUseSoundOnChange path='/test.mp3' value={2} opts={{ playWhen }} />);
    expect(playWhen).toHaveBeenCalledWith(1, 2);
    expect(mockPlay).not.toHaveBeenCalled();
  });

  it('plays when custom playWhen returns true', () => {
    const playWhen = vi.fn().mockReturnValue(true);
    const { rerender } = render(
      <TestUseSoundOnChange path='/test.mp3' value={1} opts={{ playWhen }} />
    );
    rerender(<TestUseSoundOnChange path='/test.mp3' value={2} opts={{ playWhen }} />);
    expect(mockPlay).toHaveBeenCalledTimes(1);
  });
});
