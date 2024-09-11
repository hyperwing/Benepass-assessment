import React from 'react';
import './MCard.css';

function MCard({ machine }) {

    return (
        <div className="card">
            <h2 className="card-name">{machine.hostname}</h2>
            <p className="card-content">User: {machine.username}</p>
            <input placeholder='Enter Command' className='card-command' type="text"></input>
            <button className='card-button'>Submit</button>
        </div>
    );
}

export default MCard;
