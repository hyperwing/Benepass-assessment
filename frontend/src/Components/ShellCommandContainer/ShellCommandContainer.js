import React, { useState } from "react"
import './ShellCommandContainer.css'

import MachineModal from "../MachineModal/MachineModal"
import MCard from "../MCard/MCard"

function ShellCommandContainer() {

    // set default machines
    const [machines, setMachines] = useState([
        {
            index: 0,
            hostname: "137.184.197.58",
            username: "test1",
            password: "test1-password"
        },
        {
            index: 1,
            hostname: "137.184.197.58",
            username: "test2",
            password: "test2-password"
        },
        {
            index: 2,
            hostname: "137.184.197.58",
            username: "test3",
            password: "test3-password"
        }
    ])

    const [modalOpen, setModalOpen] = useState(false)
    const [index, setIndex] = useState(3)

    function handleCloseModal() {
        setModalOpen(false)
    }

    function handleSaveMachine(e) {
        setMachines([...machines, {
            hostname: e.hostname,
            username: e.username,
            password: e.password,
            index: index
        }])
        setIndex(index + 1)
    }

    function handleDeleteMachine(e) {
        console.log(e)

        setMachines(machines.filter((machine) => {
            return e.index !== machine.index
        }))
    }

    return (
        <div className="container">
            <h2 className="container-title">Shell Command Runner</h2>
            
            <button 
                className="container-button" 
                onClick={(e) => setModalOpen(true)}>
                Add New Machine 🖥️
            </button>
            

            <MachineModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveMachine}
            ></MachineModal>

            <ul className="machine-list">
                {machines.map((machine) => {
                    return (
                        <li key={machine.index}>
                            <MCard
                                machine={machine}
                                onDelete={handleDeleteMachine}
                            ></MCard>
                        </li>
                    )
                })}
            </ul>


        </div>
    );
}

export default ShellCommandContainer;