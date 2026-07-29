import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["src/**/*.test.ts"],
		globals: true,
		// Server tests import a shared Express app that binds a fixed port and
		// writes shared config paths; run files serially to avoid races.
		fileParallelism: false,
	},
	plugins: [tsconfigPaths()],
});
