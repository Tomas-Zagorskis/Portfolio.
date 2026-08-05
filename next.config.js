/** @type {import('next').NextConfig} */
const nextConfig = {
	// Required until Next 14 — Server Actions are still behind a flag on 13.x.
	// Remove this together with the Next upgrade.
	experimental: {
		serverActions: true,
	},
};

module.exports = nextConfig;
