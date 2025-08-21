const { contextBridge, clipboard } = require('electron');

contextBridge.exposeInMainWorld('api', {
  copyToClipboard: (text) => clipboard.writeText(text || '')
});
