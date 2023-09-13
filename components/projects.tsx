'use client';

import { Fragment } from 'react';

import { projectsData } from '@/lib/data';
import { useSectionInView } from '@/lib/hooks';
import Project from './project';
import SectionHeading from './section-heading';

export default function Projects() {
	const { ref } = useSectionInView('Projects', 0.5);

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
