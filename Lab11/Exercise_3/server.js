const http = require('http');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('userAction', (data) => {
    console.log(`[Listener 1] Event received at: ${new Date().toLocaleTimeString()}`);
});
myEmitter.on('userAction', (data) => {
    console.log(`[Listener 2] Data processed: User "${data.user}" performed "${data.action}"`);
});
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <style>
                    body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f2f5; margin: 0; }
                    .card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
                    button { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 16px; }
                    button:hover { background: #0056b3; }
                    #status { margin-top: 15px; color: #28a745; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2>Event-Driven Node.js</h2>
                    <p>Click below to trigger a server-side event.</p>
                    <button onclick="triggerEvent()">Trigger Event</button>
                    <div id="status"></div>
                </div>
                <script>
                    function triggerEvent() {
                        fetch('/trigger')
                            .then(response => response.text())
                            .then(data => {
                                document.getElementById('status').innerText = data;
                            });
                    }
                </script>
            </body>
            </html>
        `);
    } else if (req.url === '/trigger') {
        setTimeout(() => {
            myEmitter.emit('userAction', { user: 'Nani', action: 'ButtonClicked' });
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Event Triggered Successfully! Check Server Console.');
        }, 500);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log('Waiting for events...');
});
