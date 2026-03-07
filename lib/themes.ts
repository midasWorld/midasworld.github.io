export interface ThemeTokens {
  // Backgrounds
  bgBase: string;
  bgSidebar: string;
  bgCard: string;
  bgActive: string;   // active menu item & badge
  bgBadge: string;    // category badge
  bgHover: string;    // subtle hover for non-active items
  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textAccent: string;  // links, active items
  textBadge: string;
  // Borders
  borderBase: string;
  borderAccent: string;      // active category left bar
  borderCardHover: string;
  // Font
  fontDisplayFamily: string; // used for titles/display elements
  // Card
  cardRadius: string;
  cardShadow: string;
  // Optional Google Fonts URL (null = no extra fonts needed)
  googleFontsUrl: string | null;
}

export const themes: Record<string, { light: ThemeTokens; dark: ThemeTokens }> = {
  default: {
    light: {
      bgBase: '#f9fafb',
      bgSidebar: '#ffffff',
      bgCard: '#ffffff',
      bgActive: '#fee2e2',
      bgBadge: '#fee2e2',
      bgHover: '#f9fafb',
      textPrimary: '#111827',
      textSecondary: '#374151',
      textMuted: '#6b7280',
      textAccent: '#dc2626',
      textBadge: '#b91c1c',
      borderBase: '#e5e7eb',
      borderAccent: '#dc2626',
      borderCardHover: '#f87171',
      fontDisplayFamily: 'var(--font-noto-sans), system-ui, sans-serif',
      cardRadius: '0.75rem',
      cardShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      googleFontsUrl: null,
    },
    dark: {
      bgBase: '#030712',
      bgSidebar: '#111827',
      bgCard: '#1f2937',
      bgActive: 'rgba(239, 68, 68, 0.15)',
      bgBadge: 'rgba(239, 68, 68, 0.15)',
      bgHover: 'rgba(31, 41, 55, 0.5)',
      textPrimary: '#f9fafb',
      textSecondary: '#e5e7eb',
      textMuted: '#9ca3af',
      textAccent: '#f87171',
      textBadge: '#f87171',
      borderBase: '#1f2937',
      borderAccent: '#f87171',
      borderCardHover: '#ef4444',
      fontDisplayFamily: 'var(--font-noto-sans), system-ui, sans-serif',
      cardRadius: '0.75rem',
      cardShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      googleFontsUrl: null,
    },
  },

  warm: {
    light: {
      bgBase: '#fdf6e3',
      bgSidebar: '#f5ede0',
      bgCard: '#fffbf0',
      bgActive: '#fef3c7',
      bgBadge: '#fef3c7',
      bgHover: '#f0e6d0',
      textPrimary: '#1c1008',
      textSecondary: '#44301a',
      textMuted: '#92745a',
      textAccent: '#b45309',
      textBadge: '#92400e',
      borderBase: '#e8d5b7',
      borderAccent: '#b45309',
      borderCardHover: '#d97706',
      fontDisplayFamily: "'Noto Serif KR', Georgia, serif",
      cardRadius: '0.5rem',
      cardShadow: '0 4px 6px -1px rgb(180 83 9 / 0.12), 0 2px 4px -2px rgb(180 83 9 / 0.08)',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700&display=swap',
    },
    dark: {
      bgBase: '#1c1612',
      bgSidebar: '#231e18',
      bgCard: '#2a231c',
      bgActive: 'rgba(251, 191, 36, 0.15)',
      bgBadge: 'rgba(251, 191, 36, 0.15)',
      bgHover: 'rgba(52, 44, 36, 0.6)',
      textPrimary: '#fdf6e3',
      textSecondary: '#e8d5b7',
      textMuted: '#a08060',
      textAccent: '#fbbf24',
      textBadge: '#fbbf24',
      borderBase: '#3d3228',
      borderAccent: '#fbbf24',
      borderCardHover: '#f59e0b',
      fontDisplayFamily: "'Noto Serif KR', Georgia, serif",
      cardRadius: '0.5rem',
      cardShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700&display=swap',
    },
  },

  'dark-pro': {
    light: {
      bgBase: '#f8fafc',
      bgSidebar: '#f1f5f9',
      bgCard: '#ffffff',
      bgActive: '#dbeafe',
      bgBadge: '#dbeafe',
      bgHover: '#e2e8f0',
      textPrimary: '#0f172a',
      textSecondary: '#1e293b',
      textMuted: '#64748b',
      textAccent: '#2563eb',
      textBadge: '#1d4ed8',
      borderBase: '#e2e8f0',
      borderAccent: '#2563eb',
      borderCardHover: '#3b82f6',
      fontDisplayFamily: "'JetBrains Mono', monospace",
      cardRadius: '0.375rem',
      cardShadow: 'none',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap',
    },
    dark: {
      bgBase: '#0d1117',
      bgSidebar: '#161b22',
      bgCard: '#21262d',
      bgActive: 'rgba(88, 166, 255, 0.15)',
      bgBadge: 'rgba(88, 166, 255, 0.15)',
      bgHover: 'rgba(48, 54, 61, 0.6)',
      textPrimary: '#e6edf3',
      textSecondary: '#c9d1d9',
      textMuted: '#8b949e',
      textAccent: '#58a6ff',
      textBadge: '#58a6ff',
      borderBase: '#30363d',
      borderAccent: '#58a6ff',
      borderCardHover: '#388bfd',
      fontDisplayFamily: "'JetBrains Mono', monospace",
      cardRadius: '0.375rem',
      cardShadow: 'none',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap',
    },
  },

  minimal: {
    light: {
      bgBase: '#ffffff',
      bgSidebar: '#fafafa',
      bgCard: '#ffffff',
      bgActive: '#f4f4f5',
      bgBadge: '#f4f4f5',
      bgHover: '#f4f4f5',
      textPrimary: '#09090b',
      textSecondary: '#18181b',
      textMuted: '#71717a',
      textAccent: '#18181b',
      textBadge: '#18181b',
      borderBase: '#e4e4e7',
      borderAccent: '#18181b',
      borderCardHover: '#a1a1aa',
      fontDisplayFamily: 'var(--font-noto-sans), system-ui, sans-serif',
      cardRadius: '0.125rem',
      cardShadow: 'none',
      googleFontsUrl: null,
    },
    dark: {
      bgBase: '#09090b',
      bgSidebar: '#111113',
      bgCard: '#18181b',
      bgActive: 'rgba(228, 228, 231, 0.1)',
      bgBadge: 'rgba(228, 228, 231, 0.1)',
      bgHover: 'rgba(39, 39, 42, 0.6)',
      textPrimary: '#fafafa',
      textSecondary: '#e4e4e7',
      textMuted: '#a1a1aa',
      textAccent: '#e4e4e7',
      textBadge: '#e4e4e7',
      borderBase: '#27272a',
      borderAccent: '#e4e4e7',
      borderCardHover: '#52525b',
      fontDisplayFamily: 'var(--font-noto-sans), system-ui, sans-serif',
      cardRadius: '0.125rem',
      cardShadow: 'none',
      googleFontsUrl: null,
    },
  },
};

function tokensToCssVars(tokens: ThemeTokens): string {
  return [
    `--bg-base: ${tokens.bgBase}`,
    `--bg-sidebar: ${tokens.bgSidebar}`,
    `--bg-card: ${tokens.bgCard}`,
    `--bg-active: ${tokens.bgActive}`,
    `--bg-badge: ${tokens.bgBadge}`,
    `--bg-hover: ${tokens.bgHover}`,
    `--text-primary: ${tokens.textPrimary}`,
    `--text-secondary: ${tokens.textSecondary}`,
    `--text-muted: ${tokens.textMuted}`,
    `--text-accent: ${tokens.textAccent}`,
    `--text-badge: ${tokens.textBadge}`,
    `--border-base: ${tokens.borderBase}`,
    `--border-accent: ${tokens.borderAccent}`,
    `--border-card-hover: ${tokens.borderCardHover}`,
    `--font-display-family: ${tokens.fontDisplayFamily}`,
    `--card-radius: ${tokens.cardRadius}`,
    `--card-shadow: ${tokens.cardShadow}`,
  ]
    .map((v) => `  ${v};`)
    .join('\n');
}

export function buildCssVars(
  light: ThemeTokens,
  dark: ThemeTokens
): string {
  return `:root {\n${tokensToCssVars(light)}\n}\n.dark {\n${tokensToCssVars(dark)}\n}`;
}
