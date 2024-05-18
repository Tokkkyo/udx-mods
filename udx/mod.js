/**
 * Mod.js : mods/udx/mod.js
 * For security reasons, the mod is completely isolated from the app main process.
 * However, this mod.js file facilitates bidirectional communication between the
 * renderer process and the mod. This allows the use of predefined functions,
 * which exposed here to the window object.
 * @module mod
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage}
 *
 * Functions exposed to the window object:
 * - udx_openExternalShell
 * - udx_getModFolderPath
 * - udx_getShipData
 * - udx_openIsolatedShip
 */

// Store promise resolutions in an resolvers object
const resolvers = {}

/**
 * Event: message - Listen for messages from the parent window.
 * Resolve the corresponding promise and remove it from the object.
 * @param {Object} event - The event object.
 * @param {string} event.data.functionToRun - The function to run.
 * @param {any} event.data.result - The result of the function.
 */
window.addEventListener('message', (event) => {
  const { functionToRun, result } = event.data
  if (functionToRun in resolvers) {
    resolvers[functionToRun](result)
    delete resolvers[functionToRun]
  }
})

/**
 * Function: udx_openExternalShell sends a message to the parent window who will
 * open a new shell with the given url.
 * Users will need to confirm the action.
 * @param {string} url - The url to open in the shell.
 * @returns {Promise} - A promise that resolves when the shell is opened.
 * @example udx_openExternalShell('https://uxondynamics.com/')
 */
function udx_openExternalShell(url) {
  return new Promise((resolve) => {
    window.parent.postMessage({ functionToRun: 'openExternalShell', url: url }, '*')
    resolvers.openExternalShell = resolve
  })
}

/**
 * Function: udx_getModFolderPath sends a message to the parent window who will
 * return the path to the mod folder.
 * Load assets or components from the mod folder to use them in the mod.
 * @returns {Promise} - A promise that resolves with the path to the mod folder.
 * @example udx_getModFolderPath().then((path) => console.log(path))
 */
function udx_getModFolderPath() {
  return new Promise((resolve) => {
    window.parent.postMessage({ functionToRun: 'getModFolderPath' }, '*')
    resolvers.getModFolderPath = resolve
  })
}

/**
 * Function: udx_getShipData sends a message to the parent window who will
 * return the shipData.json file. You can use this data toget information about
 * the ship.
 * @returns {Promise} - A promise that resolves with the shipData file.
 * @example udx_getShipData().then((shipData) => console.log(shipData))
 */
function udx_getShipData() {
  return new Promise((resolve) => {
    window.parent.postMessage({ functionToRun: 'getShipData' }, '*')
    resolvers.getShipData = resolve
  })
}

/**
 * Function: udx_openIsolatedShip sends a message to the parent window who will
 * open a new isolated view of the ship with the given shipToken.
 * @param {string} shipToken - The shipToken to open in the isolated view.
 * @returns {Promise} - A promise that resolves when the isolated view is opened.
 * @example udx_openIsolatedShip('shipToken')
 */
function udx_openIsolatedShipView(shipToken) {
  return new Promise((resolve) => {
    window.parent.postMessage({ functionToRun: 'openIsolatedShipView', shipToken: shipToken }, '*')
    resolvers.openIsolatedShip = resolve
  })
}

// Expose the functions to the window object
window.udx_openExternalShell = udx_openExternalShell
window.udx_getModFolderPath = udx_getModFolderPath
window.udx_getShipData = udx_getShipData
window.udx_openIsolatedShipView = udx_openIsolatedShipView
