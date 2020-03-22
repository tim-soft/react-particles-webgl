/**
 * Run Jest tests using Google Puppeteer and the Example App
 *
 * https://github.com/smooth-code/jest-puppeteer
 */
module.exports = {
    // Launch server options
    // https://github.com/smooth-code/jest-puppeteer/tree/master/packages/jest-dev-server#options
    server: {
        command: `yarn start`,
        port: 3000,
        // Amount of time to wait for create-react-app to boot up
        launchTimeout: 30000,
        // Log server output
        debug: true
    },
    // Launch Puppeteer options
    // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
    launch: {
        // Dump browser console commands to terminal
        dumpio: true
    }
};
