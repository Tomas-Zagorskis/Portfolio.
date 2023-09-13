'use client';

import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useActiveSectionContext } from '@/context/active-section';
import { projectsData } from '@/lib/data';
import Project from './project';
import SectionHeading from './section-heading';

export default function Projects() {
	const { ref, inView } = useInView({
		threshold: 0.5,
	});
	const { setActiveSection } = useActiveSectionContext();

	useEffect(() => {
		if (inView) {
			setActiveSection('Projects');
		}
	}, [inView]);

	return (
		<section ref={ref} id='projects' className='scroll-mt-28'>
			<SectionHeading>My Projects</SectionHeading>
			<div>
				{projectsData.map((project, index) => (
					<Fragment key={project.title.replace(' ', '-')}>
						<Project {...project} />
					</Fragment>
				))}
			</div>
		</section>
	);
}
