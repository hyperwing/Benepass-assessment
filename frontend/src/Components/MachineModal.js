import React, { useReducer } from "react"
import './MachineModal.css'

function MachineModal({ isOpen, onClose, onSave }) {

    const initialFormState = {
        hostname: "",
        username: "",
        password: ""
    }

    const [machine, setMachine] = useReducer(formReducer, initialFormState)

    function formReducer(state, action) {
        switch (action.type) {
            case "UPDATE_FIELD":
                return {
                    ...state,
                    [action.field]: action.payload,
                };
            default:
                return state;
        }
    }

    function handleChange(e) {
        setMachine({
            type: "UPDATE_FIELD",
            field: e.target.name,
            payload: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSave(machine)
        onClose()
    }

    if (!isOpen) {
        return null
    }

    return (<>

        <div className="modal-overlay">
            <div className="modal">
                <h2>Enter New Machine Details</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="hostname"
                        name="hostname"
                        onChange={handleChange}
                        placeholder="Hostname"
                    />
                    <input
                        type="username"
                        name="username"
                        onChange={handleChange}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                    />


                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>


    </>)
}
export default MachineModal;
