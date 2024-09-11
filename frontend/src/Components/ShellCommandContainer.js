import React, { useReducer, useState } from "react"
import './MachineModal.css'
import MachineModal from "./MachineModal"
import MCard from "./MCard"

function ShellCommandContainer() {


    const [machines, setMachines] = useState([
        {
            hostname: "137.184.197.58",
            username: "test1",
            password: "test1-password"
        },
        {
            hostname: "137.184.197.58",
            username: "test2",
            password: "test2-password"
        },
        {
            hostname: "137.184.197.58",
            username: "test3",
            password: "test3-password"
        }
    ])

    const [modalOpen, setModalOpen] = useState(false)

    function handleCloseModal() {
        setModalOpen(false)

    }
    function handleSaveMachine(e) {

        console.log(e)

        setMachines([...machines, {
            hostname: e.hostname,
            username: e.username,
            password: e.password
        }])

    }

    return (
        <div className="App">
            <h2>Shell Command Runner</h2>
            <button onClick={(e) => setModalOpen(true)}>Add New Machine</button>

            <MachineModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveMachine}
            ></MachineModal>


            {machines.map((machine) => {

                return <MCard machine={machine}></MCard>

            })}


        </div>
    );
}

export default ShellCommandContainer;