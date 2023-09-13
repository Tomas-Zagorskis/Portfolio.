import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useActiveSectionContext } from '@/context/active-section';
import { SectionName } from './types';

export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
	const { ref, inView } = useInView({
		threshold,
	});
	const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

	useEffect(() => {
		if (inView && timeOfLastClick < Date.now() - 2000) {
			setActiveSection(sectionName);
		}
	}, [inView, timeOfLastClick]);

	return { ref };
}
