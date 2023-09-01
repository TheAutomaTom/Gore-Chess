import {app} from "electron";
import "./security-restrictions";
import {restoreOrCreateWindow} from "/@/mainWindow";
import {platform} from "node:process";

/**
 * Prevent electron from running multiple instances.
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on("second-instance", restoreOrCreateWindow);

/**
 * Disable Hardware Acceleration to save more system resources.
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});


// @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
app.on("activate", restoreOrCreateWindow);

/**
 * Create the application window when the background process is ready.
 */
app
  .whenReady()
  .then(restoreOrCreateWindow)
  .catch(e => console.error("Failed create window:", e));

/**
 * Install Vue.js or any other extension in development mode only.
 * Note: You must install `electron-devtools-installer` manually
 */
if (import.meta.env.DEV) {

  /**
   * // This the template's default Dev Tools Installer code that does not seem to work!
   * // It seems like the fault is with electron-devtools-installer.
   * app.whenReady()
   *   .then(() => import("electron-devtools-installer"))
   *   .then(module => {
   *     const {default: installExtension, VUEJS3_DEVTOOLS} =
   *       // @ts-expect-error Hotfix for https://github.com/cawa-93/vite-electron-builder/issues/915
   *       typeof module.default === "function" ? module : (module.default as typeof module);
   *     return installExtension(VUEJS3_DEVTOOLS, { loadExtensionOptions: { allowFileAccess: true } })
   *     .then((name) => console.log(`Added Extension:  ${name}`));
   *   })
   *   .catch(e => console.error("Failed install extension:", e));
   */

  // This is the workaround for `electron-devtools-installer`
  // To get your extension-id:
  // 1. In a chrome browser, go to url `chrome://extensions/`
  // 2. Select dev tools extension
  // 3. Look in address bar.
  // 4. Find that folder here:
  //      `C:\Users\YOUR_NAME_HERE\AppData\Local\Google\Chrome\User Data\Default\Extensions`
  // 5. The version's folder name for the path `extensionVersion` seen below.
  if (import.meta.env.DEV) {
    const { app, session } = require("electron");
    const path = require("path");
    const os = require("os");
    const extensionId = "\\nhdogjmejiglipccpnnnanhbledajbpd";
    const basePath = "AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions";
    const extensionVersion = "\\6.5.0_0";
    const vueDevToolsPath = path.join( os.homedir(), basePath, extensionId, extensionVersion );
    app.whenReady().then(async () => {
      await session.defaultSession.loadExtension(vueDevToolsPath);
    })
    .catch(e => console.error("Failed to install dev tools:", e));
  }

}

/**
 * Check for app updates, install it in background and notify user that new version was installed.
 * No reason run this in non-production build.
 * @see https://www.electron.build/auto-update.html#quick-setup-guide
 *
 * Note: It may throw "ENOENT: no such file app-update.yml"
 * if you compile production app without publishing it to distribution server.
 * Like `npm run compile` does. It's ok 😅
 */
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() =>
      /**
       * Here we forced to use `require` since electron doesn't fully support dynamic import in asar archives
       * @see https://github.com/electron/electron/issues/38829
       * Potentially it may be fixed by this https://github.com/electron/electron/pull/37535
       */
      require("electron-updater").autoUpdater.checkForUpdatesAndNotify()
    )
    .catch(e => console.error("Failed check and install updates:", e));
}
