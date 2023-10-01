'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

import { projectsData } from '@/lib/data';
import { FaExternalLinkAlt, FaGithubSquare } from 'react-icons/fa';

type ProjectProps = (typeof projectsData)[number];

export default function Project({
	title,
	description,
	tags,
	imageUrl,
	projectUrl,
	gitHubUrl,
}: ProjectProps) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['0 1', '1.33 1'],
	});
	const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
	const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

	return (
		<motion.div
			ref={ref}
			style={{
				scale: scaleProgress,
				opacity: opacityProgress,
			}}
			className='group mb-3 sm:mb-8 last:mb-0'>
			<section className='bg-gray-100 max-w-[42rem] border border-black/5 overflow-hidden rounded-lg sm:pr-8 relative sm:h-[22rem] sm:group-even:pl-8 hover:bg-gray-200 transition dark:text-white dark:bg-white/10 dark:hover:bg-white/20'>
				<div className='pt-4 pb-6 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]'>
					<h3 className='text-2xl'>{title}</h3>
					<p className='mt-2 leading-relaxed text-gray-700 dark:text-white/70'>
						{description}
					</p>
					<ul className='flex flex-wrap mt-4 gap-2 justify-center'>
						{tags.map((tag, index) => (
							<li
								key={index}
								className='bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/80'>
								{tag}
							</li>
						))}
					</ul>
					<div className='flex gap-4 sm:mt-auto justify-end group-even:justify-start'>
						{projectUrl && (
							<a
								href={projectUrl}
								draggable={false}
								target='_blank'
								className='bg-white py-2 px-8 h-fit text-gray-700 flex items-center justify-center rounded-full focus:scale-105 hover:scale-105 hover:text-gray-950 active:scale-105 transition borderBlack dark:bg-white/10 dark:text-white/60'>
								<FaExternalLinkAlt />
							</a>
						)}
						{gitHubUrl && (
							<a
								href={gitHubUrl}
								draggable={false}
								target='_blank'
								className='bg-white py-2 px-8 h-fit text-gray-700 flex items-center justify-center rounded-full focus:scale-105 hover:scale-105 hover:text-gray-950 active:scale-105 transition borderBlack dark:bg-white/10 dark:text-white/60'>
								<FaGithubSquare />
							</a>
						)}
					</div>
				</div>
				<Image
					src={imageUrl}
					draggable={false}
					alt='Project I worked on'
					quality={95}
					className='absolute hidden sm:block top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl group-even:-right-[initial]
              group-even:-left-40
      
              group-hover:-translate-x-3
              group-hover:translate-y-3
              group-hover:-rotate-2
              group-hover:scale-[1.04] 
              
              group-even:group-hover:translate-x-3
              group-even:group-hover:translate-y-3
              group-even:group-hover:rotate-2
      
              transition '
				/>
			</section>
		</motion.div>
	);
}
