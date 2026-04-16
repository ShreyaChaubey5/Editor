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