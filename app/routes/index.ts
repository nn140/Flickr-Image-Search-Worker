import type { PersonSearchResponse } from '@/typings/person';
import type { PhotoSearchResponse } from '@/typings/search';
import { Time } from '@sapphire/timestamp';
import axios from 'axios';
import { createRoute } from 'honox/factory';

export const POST = createRoute(async (c) => {
	const ip = c.req.header('CF-Connecting-IP') ?? 'unknown';
	const { success } = await c.env.RATE_LIMITER.limit({ key: ip });
	if (!success) {
		return c.json({ error: 'Rate limit exceeded. Max 15 requests per minute.' }, 429);
	}

	const { query, limit = 25 } = await c.req.json();

	const cacheKey = `flickr:${query}:${limit}`;

	// Try fetching from cache first
	const cachedResponse = await c.env.FLICKR_IMG_CACHE.get(cacheKey);
	if (cachedResponse) return c.json(JSON.parse(cachedResponse));

	const request = await axios.get<PhotoSearchResponse>(
		`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${c.env.FLICKR_API_KEY}&text=${encodeURIComponent(query)}&sort=date-taken-desc&extras=url_o,url_l&format=json&nojsoncallback=1&per_page=${limit}`
	);

	const photosData = request.data.photos.photo;
	const authorIds = [...new Set(photosData.map((photo) => photo.owner))];

	const photos = photosData.map((photo) => ({
		owner: photo.owner,
		url: photo.url_o ?? photo.url_l,
	}));
	const authors = await Promise.all(
		authorIds.map(async (authorId) => {
			const request = await axios.get<PersonSearchResponse>(
				`https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=${c.env.FLICKR_API_KEY}&user_id=${authorId}&format=json&nojsoncallback=1`
			);

			const username = request.data.person.username._content;

			return { id: authorId, username };
		})
	);

	const authorMap = Object.fromEntries(authors.map((a) => [a.id, a.username]));

	const result = photos.map((photo) => ({
		url: photo.url,
		username: authorMap[photo.owner] || 'Unknown',
	}));

	await c.env.FLICKR_IMG_CACHE.put(cacheKey, JSON.stringify(result), {
		expirationTtl: Time.Hour,
	});

	return c.json(result);
});
