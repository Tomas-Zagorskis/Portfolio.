'use client';

import { motion } from 'framer-motion';

import { useSectionInView } from '@/lib/hooks';
import SectionHeading from './section-heading';

export default function About() {
	const { ref } = useSectionInView('About', 0.3);

	return (
		<motion.section
			ref={ref}
			className='mb-28 max-w-[45rem] text-center leading-8 sm:mb-0 scroll-mt-28'
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.175 }}
			id='about'>
			<SectionHeading>About me</SectionHeading>
			<p className='mb-4'>
				I&rsquo;m a <strong>React frontend developer</strong> based in Kaunas
				with around <u>3 years</u> of professional experience. Right now I build{' '}
				<strong>energy monitoring dashboards</strong> in{' '}
				<strong>React and TypeScript</strong> used by{' '}
				<u>500+ people across 20+ client companies</u> to track how their sites
				consume energy.
			</p>
			<p className='mb-4'>
				My comfort zone is <em>data-dense interfaces</em>: I designed a reusable
				visualisation library of <u>15+ chart components</u> &mdash;{' '}
				<em>Gantt, scatter, line and bar</em> &mdash; plus{' '}
				<strong>GIS map views</strong> for locating and inspecting metering
				devices. The frontend talks to <u>Kotlin/Quarkus</u> services over{' '}
				<strong>GraphQL</strong>, and I contribute backend changes when a feature
				needs them. I cover my work with{' '}
				<u>Vitest, Jest, React Testing Library and Cypress</u>, and I own the{' '}
				<strong>RC and production releases</strong> we ship several times a week.
			</p>
			<p>
				I came to software from a different direction &mdash; a{' '}
				<strong>
					<em>Master&rsquo;s in chemical engineering</em>
				</strong>{' '}
				and years leading a <u>20-person production shift</u>, which is where I
				learned to debug under pressure and communicate clearly across teams.
				I&rsquo;m always happy to talk about frontend work.{' '}
				<strong>Let&rsquo;s connect!</strong>
			</p>
		</motion.section>
	);
}
