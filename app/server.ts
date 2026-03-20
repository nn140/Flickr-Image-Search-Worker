import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { createApp } from 'honox/server';

const base = new Hono<{ Bindings: Env }>({ strict: true });
const app = createApp<{ Bindings: Env }>({ trailingSlash: false, app: base });

showRoutes(app);

export default app;
