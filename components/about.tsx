'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useActiveSectionContext } from '@/context/active-section';
import SectionHeading from './section-heading';

export default function About() {
	const { ref, inView } = useInView({
		threshold: 0.75,
	});
	const { setActiveSection } = useActiveSectionContext();

	useEffect(() => {
		if (inView) {
			setActiveSection('About');
		}
	}, [inView]);

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
				I'm a dedicated individual with a background in&nbsp;
				<strong>
					<em>chemistry</em>
				</strong>
				&nbsp;who has always harbored a passion for&nbsp;<u>programming</u>.
				This drive led me to make a significant career shift, transitioning into
				the field of <strong>web and software development</strong>. I'm
				characterized by my <u>diligence</u>, <u>enthusiasm</u>, and{' '}
				<u>motivation</u> in the realm of information technology.
			</p>
			<p className='mb-4'>
				My journey in <strong>IT</strong> began with education from reputable
				institutions like <u>CodeAcademy</u> and{' '}
				<u>The Rolling Scopes School</u>, where I honed my skills in both
				<strong> front-end</strong> and <strong>back-end</strong> development.
				These experiences allowed me to craft <em>seamless user experiences</em>{' '}
				and <em>intuitive interfaces</em> for various landing pages.
			</p>
			<p className='mb-4'>
				In my most recent venture at <strong>Xplicity</strong> Company, I had
				the privilege of contributing to a groundbreaking project that leveraged{' '}
				<u>AI technology</u> to{' '}
				<strong>convert spoken language into text and generate images</strong>.
				This endeavor exposed me to a diverse tech stack, including{' '}
				<u>Angular, C#, and Azure services</u>, offering me insights into{' '}
				<em>
					voice recognition, AI transformation, and text-to-image generation
				</em>
				. Collaborating with a talented team at <strong>Xplicity</strong>{' '}
				enriched my understanding of the ever-evolving IT landscape.
			</p>
			<p>
				<strong>I'm open to offers</strong> where I can continue to gain
				experience as a <u>web developer</u>. <strong>Let's connect!</strong>
			</p>
		</motion.section>
	);
}
