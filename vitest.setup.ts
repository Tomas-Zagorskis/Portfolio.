import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// This jsdom/Node combination exposes no localStorage (Node's experimental one
// is off without --localstorage-file), so provide a minimal in-memory Storage.
// Explicit beats environment-dependent here: the theme store persists to it.
if (typeof window.localStorage === 'undefined') {
	const store = new Map<string, string>();
	Object.defineProperty(window, 'localStorage', {
		configurable: true,
		value: {
			getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
			setItem: (key: string, value: string) => {
				store.set(key, String(value));
			},
			removeItem: (key: string) => {
				store.delete(key);
			},
			clear: () => {
				store.clear();
			},
			key: (index: number) => [...store.keys()][index] ?? null,
			get length() {
				return store.size;
			},
		} satisfies Storage,
	});
}

afterEach(() => {
	cleanup();
	// The theme store reads the real <html> class, so reset it between tests.
	document.documentElement.classList.remove('dark');
	window.localStorage.clear();
});
