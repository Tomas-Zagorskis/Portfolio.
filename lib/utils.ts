export const validateString = (value: unknown, maxLength: number) => {
	return typeof value === 'string' && !!value && value.length <= maxLength;
};

export const getErrorMessage = (error: unknown): string => {
	if (error && typeof error === 'object' && 'message' in error) {
		return String(error.message);
	}

	if (error && typeof error === 'string') {
		return error;
	}

	return 'Something went wrong';
};
