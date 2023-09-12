import React from 'react';
import { PiCertificate } from 'react-icons/pi';
import { FcGraduationCap } from 'react-icons/fc';
import ImageGeneratorAiImg from '@/public/ImageGeneratorAI.png';
import PromptopiaImg from '@/public/Promptopia.png';
import FoodOrderImg from '@/public/FoodOrder.png';

export const links = [
	{
		name: 'Home',
		hash: '#home',
	},
	{
		name: 'About',
		hash: '#about',
	},
	{
		name: 'Projects',
		hash: '#projects',
	},
	{
		name: 'Skills',
		hash: '#skills',
	},
	{
		name: 'Experience',
		hash: '#experience',
	},
	{
		name: 'Contact',
		hash: '#contact',
	},
] as const;

export const experiencesData = [
	{
		title: 'Graduated Xplicity Academy',
		location: 'Kaunas',
		description:
			'During my one-week immersion at Xplicity Company, I had the exciting opportunity to contribute to a cutting-edge project.',
		icon: React.createElement(PiCertificate),
		date: 'Aug 2023',
	},
	{
		title: 'Graduated The Rolling Scope School',
		location: 'online',
		description:
			'I studied several courses and got certifications in Front-end, React, NodeJS',
		icon: React.createElement(PiCertificate),
		date: 'Feb 2022 - Aug 2023',
	},
	{
		title: 'Graduated DevBridge Sourcery Academy',
		location: 'hybrid, Kaunas',
		description:
			'A project with an HR support dashboard that simplified data management, chart generation and annual statistics using Excel files.',
		icon: React.createElement(PiCertificate),
		date: 'Oct 2022 - Dec 2022',
	},
	{
		title: 'Graduated CodeAcademy',
		location: 'online',
		description:
			'I finished my studies after 9 months. Get proficient with Javascript and Java.',
		icon: React.createElement(FcGraduationCap),
		date: 'Nov 2021 - Aug 2022',
	},
	{
		title: 'Graduated KTU',
		location: 'Kaunas',
		description:
			"I graduated after 6 years of studying chemistry. I have a master's degree in chemical engineering.",
		icon: React.createElement(FcGraduationCap),
		date: '2005 - 2013',
	},
] as const;

export const projectsData = [
	{
		title: 'Image Generator AI',
		description:
			'My role involved working on an innovative application that harnesses the power of AI technology to convert spoken words into text and then generate images using AI assistance.',
		tags: ['Angular', 'C#', '.Net', 'Azure'],
		imageUrl: ImageGeneratorAiImg,
	},
	{
		title: 'Promptopia',
		description:
			'Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts',
		tags: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Firebase', 'MongoDB'],
		imageUrl: PromptopiaImg,
	},
	{
		title: 'Food Order',
		description: 'Public web application for food orders.',
		tags: ['React', 'Firebase'],
		imageUrl: FoodOrderImg,
	},
] as const;

export const skillsData = [
	'HTML',
	'CSS',
	'JavaScript',
	'TypeScript',
	'React',
	'Angular',
	'Next.js',
	'Node.js',
	'Java',
	'C#',
	'.Net',
	'Git',
	'Tailwind',
	'MongoDB',
	'Redux',
	'GraphQL',
	'PostgreSQL',
] as const;
