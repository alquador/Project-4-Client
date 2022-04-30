import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import AcceptForm from '../shared/AcceptForm'


const AcceptInviteModal = (props) => {
    const { user, show, handleClose, updateInvite, triggerRefresh } = props
    const [invite, setInvite] = useState(props.invite)
    console.log('props.invite in edit invite modal', props.invite)
    const handleChange = (e) => {
        // e === event
        e.persist()
        //sets Invite to the updated value of the input fields
        setInvite(prevInvite => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)
            if(name === "accepted" && e.target.checked){
                value = true
            } else if (name === "accepted" && !e.target.checked){
                value = false
            }
            if (e.target.type === 'number') {
                value = parseFloat(e.target.value)
            }
            const updatedValue = { [name]: value }

            console.log('prevInvite', prevInvite)
            console.log('updatedInvite', updatedValue)

            return {...prevInvite, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        console.log('the edited invite to submit', invite)
        //api call to update a invite
        updateInvite(user, invite)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            .then(() => triggerRefresh())
            .catch(console.error)
        console.log('this is the invte after api call', invite)
    }

    return (
        //this is the pop up that displays the invite form for accepting invite
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <AcceptForm 
                    invite={invite}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Accept invite!"
                />
            </Modal.Body>
        </Modal>
    )
}
    
export default AcceptInviteModal