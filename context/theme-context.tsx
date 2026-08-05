'use client';

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useSyncExternalStore,
} from 'react';

type Theme = 'light' | 'dark';
type ThemeContextProviderProps = {
	children: ReactNode;
};
type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

// The `dark` class on <html> is the single source of truth: the inline script in
// the root layout sets it before first paint, and this store just reads it back.
// That avoids both a setState-in-effect and a hydration mismatch.
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
	listeners.add(onStoreChange);
	return () => {
		listeners.delete(onStoreChange);
	};
}

function getSnapshot(): Theme {
	return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

// SSR has no <html> to read; the script corrects the class before paint and
// useSyncExternalStore re-reads the client snapshot after hydration.
function getServerSnapshot(): Theme {
	return 'light';
}

export function setTheme(theme: Theme) {
	window.localStorage.setItem('theme', theme);
	document.documentElement.classList.toggle('dark', theme === 'dark');
	listeners.forEach(listener => listener());
}

export default function ThemeContextProvider({
	children,
}: ThemeContextProviderProps) {
	const theme = useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot,
	);

	const toggleTheme = useCallback(() => {
		setTheme(getSnapshot() === 'light' ? 'dark' : 'light');
	}, []);

	const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === null) {
		throw new Error('useTheme must be used within a ThemeContextProvider');
	}
	return context;
}
