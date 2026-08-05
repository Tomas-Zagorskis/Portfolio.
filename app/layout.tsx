import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import Footer from '@/components/footer';
import Header from '@/components/header';
import ActiveSectionContextProvider from '@/context/active-section';
import './globals.css';
import ThemeSwitch from '@/components/theme-switch';
import ThemeContextProvider from '@/context/theme-context';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = 'https://tomas-zagorskis.vercel.app';
const title = 'Tomas Zagorskis | React Frontend Developer';
const description =
	'React frontend developer with around 3 years of experience building data-dense dashboards in React and TypeScript.';

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title,
	description,
	authors: [{ name: 'Tomas Zagorskis', url: siteUrl }],
	keywords: [
		'Tomas Zagorskis',
		'React developer',
		'frontend developer',
		'TypeScript',
		'Next.js',
		'Kaunas',
		'Lithuania',
	],
	openGraph: {
		title,
		description,
		url: siteUrl,
		siteName: 'Tomas Zagorskis',
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title,
		description,
	},
};

// Runs before first paint so dark-mode visitors never see a flash of the light
// theme. Kept in sync with the toggle in context/theme-context.tsx.
const themeScript = `
(function () {
	try {
		var stored = localStorage.getItem('theme');
		var dark = stored
			? stored === 'dark'
			: window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (dark) document.documentElement.classList.add('dark');
	} catch (e) {}
})();
`;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className='!scroll-smooth' suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body
				className={`${inter.className} bg-slate-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-95`}>
				<div className='bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]'></div>
				<div className='bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]'></div>

				<ThemeContextProvider>
					<ActiveSectionContextProvider>
						<Header />
						{children}
						<Footer />
						<Toaster position='bottom-center' />
						<ThemeSwitch />
					</ActiveSectionContextProvider>
				</ThemeContextProvider>
			</body>
		</html>
	);
}
