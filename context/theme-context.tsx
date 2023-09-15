'use client';

import {
	useState,
	useEffect,
	createContext,
	ReactNode,
	useContext,
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

	useEffect(() => {
		const localTheme = window.localStorage.getItem('theme');
		if (localTheme) {
			setTheme(localTheme as Theme);
			if (localTheme === 'dark') {
				document.documentElement.classList.add('dark');
			}
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('dark');
			document.documentElement.classList.add('dark');
		}
	}, []);

	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark');
			window.localStorage.setItem('theme', 'dark');
			document.documentElement.classList.add('dark');
		} else {
			setTheme('light');
			window.localStorage.setItem('theme', 'light');
			document.documentElement.classList.remove('dark');
		}
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === null) {
		throw new Error('useTheme must be used within a ThemeContextProvider');
	}
	return context;
}
