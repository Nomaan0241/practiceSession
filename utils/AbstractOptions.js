/**
 * Class is used instead of function we can access many methods in each instance.
 * Since query parameter is object from the mongoose. which contains the query
 * we can perform all the operation on it only by accessing its reference
 */

import { replaceComparisionStrings } from "../utils/commonUtils.js";

class AbstractOptions {
	constructor(query, requestQuery) {
		this.query = query;
		this.requestQuery = requestQuery;
	}

	filter() {
		let queryString = JSON.stringify(this.requestQuery);
		queryString = replaceComparisionStrings(queryString);
		this.query.find(JSON.parse(queryString));
		return this;
	}

	sort() {
		if (this.requestQuery.sort) {
			this.query = this.query.sort(this.requestQuery.sort);
		}
		return this;
	}

	pagination() {
		let page = this.requestQuery.page * 1 || 1;
		let skip = this.requestQuery.skip * 1 || 100;
		let limit = (page - 1) * skip;
		this.query.skip(limit).limit(skip);
		return this;
	}

	setFields() {
		if (this.requestQuery.fields) {
			this.query = this.query.select(this.requestQuery.fields);
		}
		return this;
	}
}

export default AbstractOptions;
