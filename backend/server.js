const express = require('express');
const { Client } = require('ssh2');
const app = express();
const port = 3001;

app.use(express.json());


app.get('/health', (req, res)=>{
    res.status(200).send("Healthy!")
})

app.post('/run-command', (req, res) => {
    const { username, password, hostname, command } = req.body;
    const conn = new Client();
    conn.on('ready', () => {
        conn.exec(command, (err, stream) => {
            if (err) throw err;
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
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
