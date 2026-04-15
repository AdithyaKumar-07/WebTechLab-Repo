const http = require('http');
const PORT = 3000;
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    console.log(`Received a ${req.method} request for: ${req.url}`);
    res.write('Hello! This is a simple Node.js server.\n');
    res.write(`You requested: ${req.url}`);
    res.end();
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop the server.');
});
