export interface Photo {
	id: string;
	owner: string; // user id
	secret: string;
	server: string;
	farm: number;
	title: string;
	ispublic: number;
	isfriend: number;
	isfamily: number;
	upgradable_sizes?: string[];
	url_l: string; // fallback
	height_l: number;
	width_l: number;
	url_o?: string; // ideal url
	height_o?: number;
	width_o?: number;
}

export interface PhotoSearchResponse {
	stat: string;
	photos: {
		page: number;
		pages: number;
		perpage: number;
		total: number;
		photo: Photo[];
	};
}
