import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "4fzbd1",

  env: {
    baseUrl: "http://localhost:3003",
    email: "cureit1981@yandex.ru",
    password: "super",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.spec.{js,ts}",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
