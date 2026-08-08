import { beforeEach, describe, expect, it, vi } from 'vitest';

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

// Must be constructible: sendEmail.ts does `new Resend(...)` at module scope.
vi.mock('resend', () => ({
	Resend: class {
		emails = { send: sendMock };
	},
}));

import { sendEmail } from './sendEmail';

function formData(fields: Record<string, string>) {
	const data = new FormData();
	for (const [key, value] of Object.entries(fields)) data.append(key, value);
	return data;
}

const valid = { senderEmail: 'someone@example.com', message: 'Hello there' };

beforeEach(() => {
	sendMock.mockReset();
	sendMock.mockResolvedValue({ data: { id: 'msg_1' }, error: null });
});

describe('sendEmail validation', () => {
	it('rejects a missing sender email without calling Resend', async () => {
		const result = await sendEmail(formData({ message: 'Hello' }));

		expect(result).toEqual({ error: 'Invalid sender email' });
		expect(sendMock).not.toHaveBeenCalled();
	});

	it('rejects an empty sender email', async () => {
		const result = await sendEmail(formData({ ...valid, senderEmail: '' }));

		expect(result).toEqual({ error: 'Invalid sender email' });
		expect(sendMock).not.toHaveBeenCalled();
	});

	it('rejects a sender email over 500 characters', async () => {
		const result = await sendEmail(
			formData({ ...valid, senderEmail: 'a'.repeat(501) }),
		);

		expect(result).toEqual({ error: 'Invalid sender email' });
		expect(sendMock).not.toHaveBeenCalled();
	});

	it('rejects a missing message', async () => {
		const result = await sendEmail(
			formData({ senderEmail: valid.senderEmail }),
		);

		expect(result).toEqual({ error: 'Invalid message' });
		expect(sendMock).not.toHaveBeenCalled();
	});

	it('rejects a message over 5000 characters', async () => {
		const result = await sendEmail(
			formData({ ...valid, message: 'm'.repeat(5001) }),
		);

		expect(result).toEqual({ error: 'Invalid message' });
		expect(sendMock).not.toHaveBeenCalled();
	});

	it('accepts values exactly at the length limits', async () => {
		const result = await sendEmail(
			formData({ senderEmail: 'a'.repeat(500), message: 'm'.repeat(5000) }),
		);

		expect(result).not.toHaveProperty('error');
		expect(sendMock).toHaveBeenCalledOnce();
	});
});

describe('sendEmail delivery', () => {
	it('sends with the expected envelope', async () => {
		await sendEmail(formData(valid));

		expect(sendMock).toHaveBeenCalledOnce();
		expect(sendMock.mock.calls[0][0]).toMatchObject({
			from: 'onboarding@resend.dev',
			to: 'tomzagos@gmail.com',
			subject: 'Message from Portfolio contact form',
		});
	});

	// Regression guard: resend v4 renamed reply_to to replyTo. If this reverts,
	// replies would silently go nowhere instead of to the sender.
	it('sets replyTo to the sender, not the legacy reply_to', async () => {
		await sendEmail(formData(valid));

		const payload = sendMock.mock.calls[0][0];
		expect(payload.replyTo).toBe(valid.senderEmail);
		expect(payload).not.toHaveProperty('reply_to');
	});

	it('passes the message through to the email component', async () => {
		await sendEmail(formData(valid));

		const { react } = sendMock.mock.calls[0][0];
		expect(react.props).toMatchObject({
			message: valid.message,
			senderEmail: valid.senderEmail,
		});
	});

	it('returns the data on success', async () => {
		const result = await sendEmail(formData(valid));

		expect(result).toEqual({ data: { data: { id: 'msg_1' }, error: null } });
	});

	it('converts a thrown error into an error message', async () => {
		sendMock.mockRejectedValue(new Error('resend exploded'));

		const result = await sendEmail(formData(valid));

		expect(result).toEqual({ error: 'resend exploded' });
	});

	it('falls back for a thrown value with no message', async () => {
		sendMock.mockRejectedValue({ code: 'ECONNRESET' });

		const result = await sendEmail(formData(valid));

		expect(result).toEqual({ error: 'Something went wrong' });
	});
});
