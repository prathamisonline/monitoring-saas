import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true, // ✅ fixed here (was: sourceMap)
  target: "es2020",
  clean: true,
});
