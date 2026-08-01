import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, "index.html"),
        festival: resolve(projectRoot, "festival/index.html"),
        experience: resolve(projectRoot, "experience/index.html"),
        visit: resolve(projectRoot, "visit/index.html"),
        foundations: resolve(projectRoot, "dev/foundations/index.html"),
        components: resolve(projectRoot, "dev/components/index.html"),
      },
    },
  },
});
