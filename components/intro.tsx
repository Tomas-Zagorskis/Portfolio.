'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRight, BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';

import { useSectionInView } from '@/lib/hooks';
import profilePhoto from '@/public/photo.png';
import { useActiveSectionContext } from '@/context/active-section';

export default function Intro() {
	const { ref } = useSectionInView('Home', 0.5);
	const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
	return (
		<section
			ref={ref}
			id='home'
			className='mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-96'>
			<div className='flex items-center justify-center'>
				<div className='relative'>
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							type: 'tween',
							duration: 0.2,
						}}>
						<Image
							src={profilePhoto}
							alt='Profile Photo'
							width='500'
							height='500'
							quality={95}
							priority
							className='h-36 w-36 rounded-full border-[0.35rem] border-white object-cover shadow-xl '
						/>
					</motion.div>
					<motion.span
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							type: 'spring',
							stiffness: 125,
							delay: 0.1,
							duration: 0.7,
						}}
						className='text-6xl absolute bottom-[-0.5rem] right-[-1.5rem] !-scale-x-100'>
						👋🏼
					</motion.span>
				</div>
			</div>
			<motion.h1
				className='mb-10 mt-14 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl'
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}>
				<strong>Hello, I&rsquo;m Tomas.</strong> I&rsquo;m a skilled{' '}
				<strong>frontend developer</strong> (<u>React</u>, <u>Angular</u>) with
				extensive experience in <u>NodeJS</u>, <u>Java</u> and <u>C#</u>{' '}
				<strong>backend development</strong>.
			</motion.h1>

			<motion.div
				className='flex flex-col sm:flex-row justify-center gap-4 px-4 text-lg font-medium'
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.1,
				}}>
				<Link
					href='#contact'
					draggable={false}
					onClick={() => {
						setActiveSection('Contact');
						setTimeOfLastClick(Date.now());
					}}
					className='group bg-gray-900 text-white select-none px-7 py-3 flex items-center justify-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition dark:border dark:border-white/10 '>
					Contact me here{' '}
					<BsArrowRight className='opacity-70 select-none group-hover:translate-x-1 transition' />
				</Link>

				<a
					href='/Zagorskis CV.pdf'
					draggable={false}
					download
					className='group bg-white px-7 py-3 select-none flex items-center justify-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition borderBlack dark:bg-white/10'>
					Download CV{' '}
					<HiDownload className='opacity-60 select-none group-hover:translate-y-1 transition' />
				</a>

				<a
					href='https://www.linkedin.com/in/tomas-zagorskis-8400528b'
					draggable={false}
					target='_blank'
					className='bg-white p-4 text-gray-700 flex items-center justify-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition borderBlack dark:bg-white/10 dark:text-white/60'>
					<BsLinkedin />
				</a>

				<a
					href='https://github.com/Tomas-Zagorskis'
					draggable={false}
					target='_blank'
					className='bg-white p-4 text-gray-700 text-[1.35rem] flex items-center justify-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition borderBlack dark:bg-white/10 dark:text-white/60'>
					<FaGithubSquare />
				</a>
			</motion.div>
		</section>
	);
}
