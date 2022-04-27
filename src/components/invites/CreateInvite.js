import React, { useState } from 'react'
import { createInvite } from '../../api/invites'
import { createInviteFailure } from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'
import InviteForm from '../shared/InviteForm'

const CreateInvite = (props) => {
    const {user, msgAlert} = props
    // console.log('user in create', user)
    const navigate = useNavigate()
    // we'll need two states
    const [invite, setInvite] = useState({title: '', date: '', time: '', location: '', details: '', accepted: ''})
    console.log('invite in create', invite)

    const handleChange = (e) => {
        // e === event
        e.persist()
        //set Invite to the new values returned by the input fields
        setInvite(prevInvite => {
            const title = e.target.title
            let value = e.target.value
            //console.log('etarget type', e.target.type)
            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            } 
            const updatedValue = { [title]: value }

            //console.log('prevProfile', prevProfile)
            //console.log('updatedValue', updatedValue)

            return {...prevInvite, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()
        //api call to create a new invite
        createInvite(user, invite)
            // if create is successful, we should navigate to the show page
            .then(res => {navigate(`/invites/${res.data.invite._id}/`)})
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createInviteFailure,
                    variant: 'danger',
                }))
         console.log('this is the invite', invite)
    }

    return (
        <InviteForm 
            invite={invite}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Add New Invite!"
        />
    )
}

export default CreateInvite