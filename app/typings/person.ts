export interface Person {
	id: string;
	nsid: string;
	ispro: number;
	is_deleted: number;
	iconserver: string;
	iconfarm: number;
	path_alias?: string;
	has_stats: number;
	username: {
		_content: string;
	};
	description: {
		_content: string;
	};
	photosurl: {
		_content: string;
	};
	mobileurl: {
		_content: string;
	};
	photos: {
		firstdatetaken: {
			_content: string;
		};
		firstdate: {
			_content: string;
		};
		count: {
			_content: number;
		};
	};
	has_adfree: number;
	has_free_standard_shipping: number;
	has_free_educational_resources: number;
}

export interface PersonSearchResponse {
	stat: string;
	person: Person;
}
