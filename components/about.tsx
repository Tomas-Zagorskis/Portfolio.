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
				I&rsquo;m a dedicated individual with a background in&nbsp;
				<strong>
					<em>chemistry</em>
				</strong>
				&nbsp;who has always harbored a passion for&nbsp;<u>programming</u>.
				This drive led me to make a significant career shift, transitioning into
				the field of <strong>web and software development</strong>. I&rsquo;m
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
			<p>
				<strong>I&rsquo;m open to offers</strong> where I can continue to gain
				experience as a <u>full-stack developer</u>.{' '}
				<strong>Let&rsquo;s connect!</strong>
			</p>
		</motion.section>
	);
}
