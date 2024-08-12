import esbuild from "esbuild";
import { execSync } from "child_process";

const outfile = "./dist/writer-assistant.min.js";

/**
 * Build file, minify, bundle and remove unecessary code
 * If build fail exit with error
 */
async function build() {
  try {
    await esbuild.build({
      entryPoints: ["src/components/writer/writer-component.ts"],
      outfile: outfile,
      bundle: true,
      format: "esm",
      target: "es2017",
      minify: true,
      treeShaking: true,
      logLevel: "info",
      define: {
        "process.env.OPENAI_API_KEY": JSON.stringify(
          process.env.OPENAI_API_KEY
        ),
      },
    });

    console.log(`Build succeeded! Output file: ${outfile}`);
  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
}
/**
 * Run tests
 * If tests fail exit with error
 */
async function runTests() {
  try {
    console.log("Running tests...");
    execSync("npm test", { stdio: "inherit" });
    console.log("Tests completed successfully.");
  } catch (err) {
    console.error("Tests failed:", err);
    process.exit(1);
  }
}

/**
 * Run tests before building
 * Proceed with build if tests pass
 */
async function main() {
  await runTests();
  await build();
}

main();
