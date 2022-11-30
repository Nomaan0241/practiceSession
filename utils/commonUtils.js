const replaceComparisionStrings = (queryString) => {
	return queryString.replace(/\b(gte|gt|lte|lt)\b/g, (str) => `$${str}`);
};

export { replaceComparisionStrings };
