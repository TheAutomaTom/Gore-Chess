import {app, BrowserWindow} from "electron";
import {join, resolve} from "node:path";
import * as signalR from "@microsoft/signalr";

async function createWindow() {
  const browserWindow = new BrowserWindow({
    show: false, // Use the 'ready-to-show' event to show the instantiated BrowserWindow.
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(app.getAppPath(), "packages/preload/dist/index.cjs")
    }
  });

  /**
   * If the 'show' property of the BrowserWindow's constructor is omitted from the initialization options,
   * it then defaults to 'true'. This can cause flickering as the window loads the html content,
   * and it also has show problematic behaviour with the closing of the window.
   * Use `show: false` and listen to the  `ready-to-show` event to show the window.
   *
   * @see https://github.com/electron/electron/issues/25012 for the afford mentioned issue.
   */
  browserWindow.on("ready-to-show", () => {
    browserWindow?.show();

    if (import.meta.env.DEV) {
      browserWindow?.webContents.openDevTools();
    }
  });

  /**
   * Load the main page of the main window.
   */
  if (import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined) {
    /**
     * Load from the Vite dev server for development.
     */
    await browserWindow.loadURL(import.meta.env.VITE_DEV_SERVER_URL);
  } else {
    /**
     * Load from the local file system for production and test.
     *
     * Use BrowserWindow.loadFile() instead of BrowserWindow.loadURL() for WhatWG URL API limitations
     * when path contains special characters like `#`.
     * Let electron handle the path quirks.
     * @see https://github.com/nodejs/node/issues/12682
     * @see https://github.com/electron/electron/issues/6869
     */
    await browserWindow.loadFile(resolve(__dirname, "../../renderer/dist/index.html"));
  }

////////////////////////////////////////////////////////


  // const connection = new signalr.HubConnectionBuilder()
  //   .withUrl("/chatHub")
  //   .build();
  
  // connection.on("ReceiveMessage", function (message: string) {
  //   console.log(message);
  // });
  
  // connection.start().then(function () {
  //   console.log("Started!");    
  // }).catch(function (err: any) {
  //     return console.error(err.toString());
  // });
  
  // connection.invoke("SendMessage", "Word")
  //   .catch(function (err: any) {
  //         return console.error(err.toString());
  //   });


////////////////////////////////////////////////////////

initializeSignalRConnection();

//////////////////////////////////////////////////////////
  return browserWindow;
}


/**
 * Restore an existing BrowserWindow or Create a new BrowserWindow.
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
    initializeSignalRConnection();
  }

  if (window.isMinimized()) window.restore();
  
  window.focus();
}



const initializeSignalRConnection = () => {
  console.log("[initializeSignalRConnection] ...");
  const connection = new signalR.HubConnectionBuilder()
    // .configureLogging(signalR.LogLevel.Information)
    .withUrl("http://localhost:7205/api/")
    // .withUrl("/api")
    .build();
    
  // signalRConnection.start().then(function () {
  //   console.log("[signalRConnection.start] ...");    
  // }).catch(function (err: any) {
  //     return console.log("[signalRConnection.start] Error: " + err.toString());   
  // });

  // signalRConnection.on("SendOffersToUser", (result: any) => {
  //   console.log("[signalRConnection/ SendOffersToUser] Result: " + result.toString());
  // });





  connection.start().catch(function (err) {
    return console.error(err.toString());
  });

  
  connection.invoke("SendMessage", "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .catch(function (err) {
      return console.error(err.toString());
    }
  );
  

  connection.on("newMessage", function (name) {
      const li = document.createElement("li");
      li.textContent = name;

      console.log(li);
  });


















};