import { esbuildPlugin } from "@web/dev-server-esbuild";
import { globbySync } from "globby";
import { playwrightLauncher } from "@web/test-runner-playwright";

export default {
  rootDir: ".",
  files: "src/**/*.test.ts",
  concurrentBrowsers: 3,
  nodeResolve: {
    exportConditions: ["production", "default"],
  },
  testFramework: {
    config: {
      timeout: 3000,
      retries: 1,
    },
  },
  plugins: [
    esbuildPlugin({
      ts: true,
      target: "esnext",
      jsxFactory: "h",
      jsxFragment: "Fragment",
      sourcemap: true,
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
      },
      tsconfig: "tsconfig.json",
    }),
  ],
  browsers: [
    playwrightLauncher({ product: "chromium" }),
    playwrightLauncher({ product: "webkit" }),
  ],
  testRunnerHtml: (testFramework) => `
    <html lang="en-US">
      <head></head>
      <body>
        <script>
          window.process = { env: { NODE_ENV: "production" } }
        </script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  groups: globbySync("src/**/*.test.ts").map((path) => {
    const groupName = path.match(/^.*\/(?<fileName>.*)\.test\.ts/).groups
      .fileName;
    return {
      name: groupName,
      files: path,
    };
  }),
};
