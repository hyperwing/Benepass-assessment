import React, { useState } from 'react';
import './MCard.css';
import axios from 'axios'

function MCard({ machine }) {

    const [output, setOutput] = useState('')
    const [command, setCommand] = useState('')

    const submitCommandURL = `${process.env.REACT_APP_SHELL_COMMAND_API_URL}${process.env.REACT_APP_COMMAND_SHELL_ENDPOINT}`


    async function submitCommand() {

        // username, password, hostname, command 
        const params = {
            username: machine.username,
            password: machine.password,
            hostname: machine.hostname,
            command: command
        }


        try {
            // const response = await axios.get('http://localhost:3001/health');
            const response = await axios.post(submitCommandURL, params)
            setOutput(response.data);
            setCommand("")
        } catch (error) {
            setOutput('Error running command');
        }

    }

    return (
        <div className="card">
            <h2 className="card-name">{machine.hostname}</h2>
            <p className="card-content">User: {machine.username}</p>
            <input
                className='card-command'
                onChange={(e) => setCommand(e.target.value)}
                value={command}
                placeholder='Enter Command' 
                type="text"/>
            <button onClick={submitCommand} className='card-button'>Submit</button>
            <p className="card-output">{output}</p>
        </div>
    );
}

export default MCard;
