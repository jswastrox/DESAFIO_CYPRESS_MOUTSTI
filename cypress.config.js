const { defineConfig } = require('cypress')

module.exports = defineConfig({
  allowCypressEnv: false,
  expose: {
    apiUrl: 'https://serverest.dev',
  },
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1366,
    viewportHeight: 768,
    video: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    defaultCommandTimeout: 15000,
    requestTimeout: 30000,
    responseTimeout: 30000,
  },
})
