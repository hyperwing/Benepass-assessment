import React, { useState } from "react"
import './ShellCommandContainer.css'
import axios from "axios"

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
    const [healthCheck, setHealthCheck] = useState("")
    const [index, setIndex] = useState(3)
    const healthCheckURL = `${process.env.REACT_APP_SHELL_COMMAND_API_URL}${process.env.REACT_APP_HEALTH_ENDPOINT}`

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
    async function runHealthCheck() {
        try {
            const response = await axios.get(healthCheckURL)
            setHealthCheck(response.data);
        } catch (error) {
            setHealthCheck(error)

        }
    }

    return (
        <div className="container">
            <h2 className="container-title">Shell Command Runner</h2>
            <button className="container-button" onClick={(e) => setModalOpen(true)}>Add New Machine 🖥️</button>
            <button className="container-button" onClick={runHealthCheck}>Run Health Check on Benepass Servers ❤️</button>

            <h3>{healthCheck}</h3>

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