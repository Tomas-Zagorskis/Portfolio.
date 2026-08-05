'use client';

import {
	useState,
	useEffect,
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
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

export default function ThemeContextProvider({
	children,
}: ThemeContextProviderProps) {
	const [theme, setTheme] = useState<Theme>('light');

	// The inline script in the root layout already resolved the theme and set the
	// class before paint, so read that back rather than resolving it a second time.
	useEffect(() => {
		setTheme(
			document.documentElement.classList.contains('dark') ? 'dark' : 'light',
		);
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme(prev => {
			const next = prev === 'light' ? 'dark' : 'light';
			window.localStorage.setItem('theme', next);
			document.documentElement.classList.toggle('dark', next === 'dark');
			return next;
		});
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
