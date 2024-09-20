import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate', // Automatically registers and updates service worker
			injectRegister: 'auto', // Injects the service worker registration script into the app
			manifest: {
				name: 'EMoM',
				short_name: 'EMoM',
				description: 'A simple "every minute on the minute" interval timer by #0FF',
				start_url: '/',
				display: 'standalone',
				background_color: '#000000',
				theme_color: '#000000',
				icons: [
					{
						src: '/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			},
			includeManifestIcons: true,
			devOptions: {
				enabled: true,
				suppressWarnings: true
			}
		})
	]
});
