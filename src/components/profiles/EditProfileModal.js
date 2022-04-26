import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import ProfileForm from '../shared/ProfileForm'

const EditProfileModal = (props) => {
    const { user, show, handleClose, updateProfile, triggerRefresh } = props
    const [profile, setProfile] = useState(props.profile)

    const handleChange = (e) => {
        // e === event
        e.persist()
        //sets Profile to the updated value of the input fields
        setProfile(prevProfile => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)
            if (e.target.type === 'number') {
                value = parseFloat(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevProfile', prevProfile)
            console.log('updatedValue', updatedValue)

            return {...prevProfile, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        console.log('the edited profile to submit', profile)
        //api call to update a profile
        updateProfile(user, profile)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            .then(() => triggerRefresh())
            .catch(console.error)
        console.log('this is the profile after api call', profile)
    }

    return (
        //this is the pop up that displays the profile form for editing
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <ProfileForm 
                    profile={profile}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit profile!"
                />
            </Modal.Body>
        </Modal>
    )
}
    
export default EditProfileModal