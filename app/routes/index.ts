import { createRoute } from 'honox/factory';

export const GET = createRoute(async (c) => {
	return c.json({ name: 'Cloudflare' });
});
