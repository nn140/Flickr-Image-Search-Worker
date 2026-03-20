import build from '@hono/vite-build/cloudflare-workers';
import adapter from '@hono/vite-dev-server/cloudflare';
import react from '@vitejs/plugin-react-swc';
import honox from 'honox/vite';
import url from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
	define: {
		'process.env': 'process.env',
	},
	plugins: [
		honox({
			devServer: {
				adapter,
			},
		}),
		build(),
		react(),
	],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: url.fileURLToPath(new URL('.', import.meta.url)),
			},
		],
	},
});
