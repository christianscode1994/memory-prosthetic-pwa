import { defineConfig } from 'vite';

export default defineConfig(async () => {
  const reactPlugin = (await import('@vitejs/plugin-react')).default;
  return {
    plugins: [reactPlugin()],
    build: { target: 'es2020' }
  };
});
