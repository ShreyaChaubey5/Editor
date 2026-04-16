// const WebSocket = require('ws');
// const http = require('http');
// const Y = require('yjs');
// const fs = require('fs');
// const path = require('path');
// const { setupWSConnection, setPersistence } = require('y-websocket/bin/utils');

// const port = 1234;
// const dataDir = path.join(__dirname, 'data');
// if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

// const docs = new Map();

// // --- 1. SET UP PERSISTENCE ---
// setPersistence({
//   bindState: async (docName, ydoc) => {
//     const filePath = path.join(dataDir, `${docName}.bin`);
    
//     // Load existing data if it exists
//     if (fs.existsSync(filePath)) {
//       try {
//         const persistedState = fs.readFileSync(filePath);
//         Y.applyUpdate(ydoc, persistedState);
//         console.log(` Loaded "${docName}" from disk`);
//       } catch (e) {
//         console.error(` Error loading "${docName}":`, e.message);
//       }
//     }

//     // Add update listener only once per document
//     if (!docs.has(docName)) {
//       docs.set(docName, true);
//       ydoc.on('update', (update) => {
//         try {
//           const state = Y.encodeStateAsUpdate(ydoc);
//           fs.writeFileSync(filePath, Buffer.from(state));
//         } catch (e) {
//           console.error(`✗ Error saving "${docName}":`, e.message);
//         }
//       });
//     }
//   },
//   writeState: async (docName, ydoc) => {
//     return Promise.resolve();
//   }
// });

// const server = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' });
//   response.end('Yjs Sync Server');
// });

// const wss = new WebSocket.Server({ server });

// wss.on('connection', (conn, req) => {
//   const roomId = req.url.slice(1);
//   console.log(`Client connected to "${roomId}"`);
  
//   setupWSConnection(conn, req);
// });

// server.listen(port, () => {
//   console.log(`\n Yjs WebSocket server running on ws://localhost:${port}\n`);
// });
const http = require('http');
const WebSocket = require('ws');
const setupWSConnection = require('y-websocket/bin/utils.js').setupWSConnection;

const port = 1234;

// Create HTTP server (IMPORTANT)
const server = http.createServer();

// Attach WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req);
});

// Start server
server.listen(port, () => {
  console.log(`Yjs WebSocket server running on ws://127.0.0.1:${port}`);
});