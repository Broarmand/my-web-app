require('dotenv').config();

const http = require('http');

// Load env variables
const PORT = process.env.PORT || 5000;
const AUTH_USERNAME = process.env.AUTH_USERNAME;
const AUTH_PASSWORD = process.env.AUTH_PASSWORD;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    //Home route
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200);
        res.end(JSON.stringify({
            message: 'Welcome to my Node.js Web Server!'
        }));
    }

    // Authentication route
    else if (req.method === 'POST' && req.url === '/login') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const { username, password } = JSON.parse(body);

                if (
                    username === AUTH_USERNAME &&
                    password === AUTH_PASSWORD
                ) {
                    res.writeHead(200);
                    res.end(JSON.stringify({
                        message: 'Login successful!',
                        authenticated: true
                    }));
                } else {
                    res.writeHead(401);
                    res.end(JSON.stringify({
                        message: 'Invalid username or password',
                        authenticated: false
                    }));
                }

            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    message: 'Invalid request'
                }));
            }
        });
    } 


    // About route
    else if (req.method === 'GET' && req.url === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('About Page\n');
    }

    else {
        res.writeHead(404);
        res.end(JSON.stringify({
            message: 'Route not found'
        }));
    }
});


server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});