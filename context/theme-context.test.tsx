import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import ThemeContextProvider, { useTheme } from './theme-context';

function ThemeProbe() {
	const { theme, toggleTheme } = useTheme();
	return (
		<button type='button' onClick={toggleTheme}>
			{theme}
		</button>
	);
}

function renderProbe() {
	return render(
		<ThemeContextProvider>
			<ThemeProbe />
		</ThemeContextProvider>,
	);
}

const probe = () => screen.getByRole('button');

describe('ThemeContextProvider', () => {
	it('reports light when <html> has no dark class', () => {
		renderProbe();
		expect(probe()).toHaveTextContent('light');
	});

	it('reads the dark class the pre-paint script already set', () => {
		document.documentElement.classList.add('dark');
		renderProbe();
		expect(probe()).toHaveTextContent('dark');
	});

	it('adds the dark class when toggled on', async () => {
		renderProbe();
		await userEvent.click(probe());

		expect(document.documentElement).toHaveClass('dark');
		expect(probe()).toHaveTextContent('dark');
	});

	it('removes the dark class when toggled back off', async () => {
		document.documentElement.classList.add('dark');
		renderProbe();
		await userEvent.click(probe());

		expect(document.documentElement).not.toHaveClass('dark');
		expect(probe()).toHaveTextContent('light');
	});

	it('persists the chosen theme to localStorage', async () => {
		renderProbe();
		await userEvent.click(probe());
		expect(window.localStorage.getItem('theme')).toBe('dark');

		await userEvent.click(probe());
		expect(window.localStorage.getItem('theme')).toBe('light');
	});

	it('throws when useTheme is used outside the provider', () => {
		expect(() => render(<ThemeProbe />)).toThrow(
			/must be used within a ThemeContextProvider/,
		);
	});
});
