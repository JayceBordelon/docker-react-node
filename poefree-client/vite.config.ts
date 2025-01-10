import { defineConfig } from 'vite';

export default defineConfig({
    base: '/',
    preview: {
        port: 3456,
        strictPort: true,
    },
    server: {
        port: 3456,
        strictPort: true,
        host: '0.0.0.0',
        origin: 'http://localhost:3456',
    },
});
