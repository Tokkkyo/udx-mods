# udx-mods

The UDX Mod System is a modding system for the UDX application. It allows users to create their own mods and integrate them into the UDX application. Mods are completely isolated from the main application process for security reasons.

#### Communication between mod and application:

Communication between the mod and the application is facilitated by the `mod.js` file. This file exposes functions to the mod rendering process, which can then be used to communicate with the application.

#### The following functions are exposed:

`udx_openExternalShell(url);`
`udx_getModFolderPath();`
`udx_getShipData();`
`udx_openIsolatedShipView(shipToken)`
