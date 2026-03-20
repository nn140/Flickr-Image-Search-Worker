import type {} from 'hono';

type Head = {
	title?: string;
};

declare module 'hono' {
	interface ContextRenderer {
		(content: string | Promise<string>, head?: Head): Response | Promise<Response>;
	}
	interface Env {
		Bindings: Cloudflare.Env;
		Variables: {};
	}
}
