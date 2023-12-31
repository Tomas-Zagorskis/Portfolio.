export default function Footer() {
	return (
		<footer className='mb-10 px-4 text-center text-gray-500 dark:text-gray-400'>
			<small className='mb-2 block text-xs'>
				&copy; {new Date().getFullYear()} Tomas Zagorskis- All rights reserved
			</small>
			<p className='text-xs'>
				<strong>About this website:</strong> built with React & Next.js (App
				Router & Server Actions), TypeScript, Tailwind CSS, Framer Motion, React
				Email & Resend, Vercel hosting.
			</p>
		</footer>
	);
}
