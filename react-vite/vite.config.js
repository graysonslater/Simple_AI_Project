// https://vitejs.dev/config/ - documentation for config
//provides type checking and autocompletion for the configuration object
import { defineConfig } from "vite";
//allows ESLint to run during the build process
import eslintPlugin from "vite-plugin-eslint";
//provides React-specific optimizations and features
import react from "@vitejs/plugin-react";


//conditional configuration based on the build mode (development or production), take sin mode as an arg
export default defineConfig((mode) => ({
  plugins: [
    //enables react plugin, Transforming JSX syntax into browser-compatible JS, Integrating React-specific optimizations into Vite's build pipeline
    react(),
    //configures ESlint plugin
    eslintPlugin({
      //runs ESLint when Vite starts
      lintOnStart: true,
      //build fails on ESLint errors only in production mode
      failOnError: mode === "production",
    }),
  ],
  //configures the development server
  server: {
    //auto open browser on server start
    open: true,
    //sets up a proxy for API requests, sets listening port for backend
    proxy: {
      "/api": "http://127.0.0.1:8000",
    },
  },
}));