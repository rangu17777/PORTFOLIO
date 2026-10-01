import http from 'http';

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Diagnostic OK</title>
    <style>
        body { background-color: #00FF00; color: black; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: sans-serif; }
        h1 { font-size: 80px; margin: 0; }
        p { font-size: 30px; }
    </style>
</head>
<body>
    <h1>✅ SERVER WORKS</h1>
    <p>Node.js is connected correctly.</p>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
});

server.listen(9999, '0.0.0.0', () => {
    console.log('DIAGNOSTIC SERVER RUNNING ON: http://localhost:9999/');
});
