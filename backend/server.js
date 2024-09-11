const express = require('express');
const { Client } = require('ssh2');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).send("Healthy!");
});

app.post('/run-command', (req, res) => {
    try {
        const { username, password, hostname, command } = req.body;
        const conn = new Client();

        conn.on('error', (err) => {
            console.error('SSH connection error:', err);
            res.status(500).send('SSH connection error: ' + err.message);
        });

        conn.on('ready', () => {
            conn.exec(command, (err, stream) => {
                if (err) {
                    console.error('Error executing command:', err);
                    res.status(500).send('Error executing command');
                    return;
                }
                let data = '';
                stream.on('close', (code, signal) => {
                    conn.end();
                    res.send(data);
                }).on('data', (chunk) => {
                    data += chunk;
                }).stderr.on('data', (chunk) => {
                    data += chunk;
                });
            });
        }).connect({
            host: hostname,
            port: 22,
            username: username,
            password: password
        });
    } catch (error) {
        console.error('Error in /run-command route:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
