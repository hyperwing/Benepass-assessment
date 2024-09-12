import React, { useState } from 'react';
import './MCard.css';
import axios from 'axios'

function MCard({ machine, onDelete }) {

    const [output, setOutput] = useState('')
    const [command, setCommand] = useState('')
    const [error, setError] = useState("card-output")

    const submitCommandURL = `${process.env.REACT_APP_SHELL_COMMAND_API_URL}${process.env.REACT_APP_COMMAND_SHELL_ENDPOINT}`

    async function submitCommand() {

        const params = {
            username: machine.username,
            password: machine.password,
            hostname: machine.hostname,
            command: command
        }


        try {
            const response = await axios.post(submitCommandURL, params)
            const outputPrefix = machine.username + "@" + machine.hostname + ":~$ " + command + "\n"
            setOutput(output.concat(outputPrefix + response.data));
            setCommand("")
        } catch (error) {
            setError("card-output-error")
            setOutput('Error:' + error );
        }

    }

    return (
        <div className="card">
            <button onClick={(e)=>onDelete(machine)} className='card-delete'>❌</button>

            <h2 className="card-name">{machine.hostname}</h2>
            <p className="card-content">User: {machine.username}</p>
            <input
                className='card-command'
                onChange={(e) => setCommand(e.target.value)}
                value={command}
                placeholder=' Enter Command' 
                type="text"/>
            <button onClick={submitCommand} className='card-button'>submit</button>
            <br/>
            <textarea readOnly={true} value={output} className={error}></textarea>
        </div>
    );
}

export default MCard;
