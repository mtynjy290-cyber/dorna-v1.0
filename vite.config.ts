import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function cleanUrlsPlugin(): Plugin {
  const pages = ['products', 'calculator', 'services', 'projects', 'about', 'standards', 'blog', 'admin'];
  const handler = (req: any, res: any, next: any) => {
    if (req.url) {
      const [pathname, search] = req.url.split('?');
      const cleanPath = pathname.replace(/^\//, '').replace(/\/$/, '');
      if (pages.includes(cleanPath)) {
        req.url = `/${cleanPath}.html${search ? `?${search}` : ''}`;
      } else if (cleanPath === '' || cleanPath === 'index') {
        req.url = `/index.html${search ? `?${search}` : ''}`;
      }
    }
    next();
  };

  return {
    name: 'vite-plugin-clean-urls',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), cleanUrlsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2020',
      minify: 'esbuild',
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      reportCompressedSize: false,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          products: path.resolve(__dirname, 'products.html'),
          calculator: path.resolve(__dirname, 'calculator.html'),
          services: path.resolve(__dirname, 'services.html'),
          projects: path.resolve(__dirname, 'projects.html'),
          about: path.resolve(__dirname, 'about.html'),
          standards: path.resolve(__dirname, 'standards.html'),
          blog: path.resolve(__dirname, 'blog.html'),
          admin: path.resolve(__dirname, 'admin.html'),
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('motion')) {
                return 'vendor-motion';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('@supabase') || id.includes('zustand')) {
                return 'vendor-data';
              }
              return 'vendor-core';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
