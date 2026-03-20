import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { createApp } from 'honox/server';

interface Environment {
	Bindings: Env;
	Variables: {};
}

const base = new Hono<Environment>({ strict: true });
const app = createApp<Environment>({ trailingSlash: false, app: base });

showRoutes(app);

export default app;
