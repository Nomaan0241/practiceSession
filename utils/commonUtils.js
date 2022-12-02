const replaceComparisionStrings = (queryString) => {
	return queryString.replace(/\b(gte|gt|lte|lt)\b/g, (str) => `$${str}`);
};

const filterResponse = (obj, ...responseToBeSent) => {
	const result = {};
	responseToBeSent.forEach((item) => {
		result[item] = obj[item];
	});
	return result;
};

export { replaceComparisionStrings, filterResponse };
