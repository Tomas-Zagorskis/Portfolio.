/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Next 16 narrowed the default to [75]; both <Image> uses request 95.
		qualities: [75, 95],
	},
};

module.exports = nextConfig;
