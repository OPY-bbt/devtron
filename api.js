const electron = require('electron')
const path = require('path');

exports.install = (devtronPath, session) => {

  session.on("extension-loaded", (...args) => {
    console.log("extension-loaded", args);
  });

  if (process.type === 'browser') {
    console.log(`Installing Devtron from ${devtronPath}`)
    console.log(session.getAllExtensions());
    if (session.getAllExtensions &&
        session.getAllExtensions().find(v => v.name === "devtron")) return true;
        console.log("loadExtension");
    return session.loadExtension(devtronPath, { allowFileAccess: true });
  } else {
    throw new Error('Devtron can only be installed from an Electron process.')
  }
}

exports.uninstall = (session) => {
  if (process.type === 'browser') {
    return session.removeExtension('devtron');
  } else {
    throw new Error('Devtron can only be uninstalled from an Electron process.')
  }
}

exports.path = __dirname
