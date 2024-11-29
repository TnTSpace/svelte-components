import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
    fs: {
      allow: [
        'dist',          // Allow access to the dist folder
        '.',             // Allow access to the project root
        'src'            // Allow access to src if needed
      ]
    }
  }
});
