import { theme } from './theme';

/**
 * Converts camelCase to kebab-case.
 * ex "primaryDark" -> "primary-dark"
 */
function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Flattens nested theme object into CSS variable entries.
 * ex { colors: { primary: '#fff' } } -> [['color-primary', '#fff']]
 */
function flattenTheme(obj: Record<string, unknown>, prefix = ''): Array<[string, string]> {
  const entries: Array<[string, string]> = [];

  for (const [key, value] of Object.entries(obj)) {
    const cssKey = prefix ? `${prefix}-${toKebabCase(key)}` : toKebabCase(key);

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      entries.push(...flattenTheme(value as Record<string, unknown>, cssKey));
    } else {
      entries.push([cssKey, String(value)]);
    }
  }

  return entries;
}

/**
 * Injects theme values as CSS custom properties on :root.
 * Calls this once at app startup.
 */
export function injectTheme(): void {
  const root = document.documentElement;

  // Map theme sections to CSS variable prefixes
  const sectionPrefixes: Record<string, string> = {
    colors: 'color',
    shadows: 'shadow',
    fonts: 'font',
    spacing: 'spacing',
    radius: 'radius',
    transitions: 'transition',
    zIndex: 'z',
  };

  // Sections to skip (used directly in JS, not as CSS variables)
  const skipSections = new Set(['scene']);

  for (const [section, values] of Object.entries(theme)) {
    if (skipSections.has(section)) continue;
    const prefix = sectionPrefixes[section] || section;
    const entries = flattenTheme(values as Record<string, unknown>, prefix);

    for (const [key, value] of entries) {
      root.style.setProperty(`--${key}`, value);
    }
  }
}
