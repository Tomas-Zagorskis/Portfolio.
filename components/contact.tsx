'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import toast from 'react-hot-toast';

import { sendEmail } from '@/actions/sendEmail';
import { useSectionInView } from '@/lib/hooks';
import SectionHeading from './section-heading';
import SubmitBtn from './submit-btn';

export default function Contact() {
	const { ref } = useSectionInView('Contact');
	const formRef = useRef<HTMLFormElement>(null);

	const handleEmailSend = async (formData: FormData) => {
		const { error } = await sendEmail(formData);

		if (error) {
			toast.error(error);
			return;
		}
		toast.success('Email sent successfully!');
		formRef.current?.reset();
	};

	return (
		<motion.section
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			viewport={{ once: true }}
			ref={ref}
			id='contact'
			className='scroll-mt-28 mb-20 sm:mb-28 w-[min(100%,38rem)] text-center'>
			<SectionHeading>Contact Me</SectionHeading>
			<p className='text-gray-700 -mt-6 dark:text-white/80'>
				Please contact me directly at{' '}
				<a href='mailto:tomzagos@gmail.com' className='underline'>
					tomzagos@gmail.com
				</a>{' '}
				or through this form.
			</p>

			<form
				ref={formRef}
				className='mt-10 flex flex-col dark:text-black'
				action={handleEmailSend}>
				<label htmlFor='senderEmail' className='sr-only'>
					Your email
				</label>
				<input
					type='email'
					id='senderEmail'
					name='senderEmail'
					required
					maxLength={500}
					className='h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:outline-none dark:focus:bg-opacity-100 transition-all'
					placeholder='Your email'
				/>
				<label htmlFor='message' className='sr-only'>
					Your message
				</label>
				<textarea
					id='message'
					name='message'
					required
					maxLength={5000}
					className='h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:outline-none dark:focus:bg-opacity-100 transition-all'
					placeholder='Your message'
				/>
				<SubmitBtn />
			</form>
		</motion.section>
	);
}
