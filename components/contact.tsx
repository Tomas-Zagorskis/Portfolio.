'use client';

import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { sendEmail } from '@/actions/sendEmail';
import { useSectionInView } from '@/lib/hooks';
import SectionHeading from './section-heading';
import SubmitBtn from './submit-btn';

export default function Contact() {
	const { ref } = useSectionInView('Contact');

	const handleEmailSend = async (formData: FormData) => {
		const { error } = await sendEmail(formData);

		if (error) {
			toast.error(error);
			return;
		}
		toast.success('Email sent successfully!');
		(document.getElementById('contactForm') as HTMLFormElement).reset();
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
			<p className='text-gray-700 -mt-6'>
				Please contact me directly at{' '}
				<a href='mailto:tomzagos@gmail.com' className='underline'>
					tomzagos@gmail.com
				</a>{' '}
				or through this form.
			</p>

			<form
				id='contactForm'
				className='mt-10 flex flex-col'
				action={handleEmailSend}>
				<input
					type='email'
					name='senderEmail'
					required
					maxLength={500}
					className='h-14 px-4 rounded-lg borderBlack'
					placeholder='Your email'
				/>
				<textarea
					name='message'
					required
					maxLength={5000}
					className='h-52 my-3 rounded-lg borderBlack p-4'
					placeholder='Your message'
				/>
				<SubmitBtn />
			</form>
		</motion.section>
	);
}
