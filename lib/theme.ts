export const THEME_STORAGE_KEY = 'wookingwoo-theme';

export type Theme = 'light' | 'dark';

export const isTheme = (value: string | null): value is Theme => {
    return value === 'light' || value === 'dark';
};

export const resolveInitialTheme = (storedTheme: string | null, prefersDark: boolean): Theme => {
    if (isTheme(storedTheme)) {
        return storedTheme;
    }

    return prefersDark ? 'dark' : 'light';
};

export const getNextTheme = (theme: Theme): Theme => {
    return theme === 'dark' ? 'light' : 'dark';
};
