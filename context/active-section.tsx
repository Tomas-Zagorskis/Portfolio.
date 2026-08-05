'use client';

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useMemo,
	useState,
} from 'react';

import type { SectionName } from '@/lib/types';

type ActiveSectionContextProviderProps = { children: ReactNode };

type ActiveSectionContextType = {
	activeSection: SectionName;
	setActiveSection: Dispatch<SetStateAction<SectionName>>;
	timeOfLastClick: number;
	setTimeOfLastClick: Dispatch<SetStateAction<number>>;
};

export const ActiveSectionContext =
	createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider({
	children,
}: ActiveSectionContextProviderProps) {
	const [activeSection, setActiveSection] = useState<SectionName>('Home');
	const [timeOfLastClick, setTimeOfLastClick] = useState(0);

	// This provider sits inside ThemeContextProvider, so a theme toggle re-renders
	// it. Without a stable value every consumer would re-render on each toggle.
	const value = useMemo(
		() => ({
			activeSection,
			setActiveSection,
			timeOfLastClick,
			setTimeOfLastClick,
		}),
		[activeSection, timeOfLastClick],
	);

	return (
		<ActiveSectionContext.Provider value={value}>
			{children}
		</ActiveSectionContext.Provider>
	);
}

export function useActiveSectionContext() {
	const context = useContext(ActiveSectionContext);
	if (!context) {
		throw new Error(
			'useActiveSectionContext must be used within an ActiveSectionContextProvider',
		);
	}
	return context;
}
