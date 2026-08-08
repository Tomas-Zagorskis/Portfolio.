import { ImageResponse } from 'next/og';

export const alt = 'Tomas Zagorskis — React Frontend Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: '0 90px',
					backgroundColor: '#f8fafc',
					// Zero-alpha stops of the same hue: `transparent` fades to
					// transparent black in satori and greys out the whole canvas.
					backgroundImage:
						'radial-gradient(circle at 88% 12%, rgba(251,226,227,1) 0%, rgba(251,226,227,0) 55%), radial-gradient(circle at 4% 92%, rgba(219,215,251,1) 0%, rgba(219,215,251,0) 55%)',
				}}>
				<div
					style={{
						fontSize: 92,
						fontWeight: 700,
						letterSpacing: '-0.03em',
						color: '#030712',
					}}>
					Tomas Zagorskis
				</div>
				<div style={{ fontSize: 44, marginTop: 16, color: '#374151' }}>
					React Frontend Developer
				</div>
				<div
					style={{
						width: 120,
						height: 8,
						marginTop: 40,
						borderRadius: 999,
						backgroundColor: '#030712',
					}}
				/>
				<div style={{ fontSize: 30, marginTop: 40, color: '#6b7280' }}>
					Data-dense dashboards in React and TypeScript
				</div>
			</div>
		),
		size,
	);
}
