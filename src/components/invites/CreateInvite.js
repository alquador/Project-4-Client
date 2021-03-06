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
            const name = e.target.name
            let value = e.target.value
            //console.log('etarget type', e.target.type)
            if(name === "accepted" && e.target.checked){
                value = true
            } else if (name === "accepted" && !e.target.checked){
                value = false
            }
            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            } 
            const updatedValue = { [name]: value }

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
            // .then(res => {navigate(`/invites/${res.data.invite.id}/`)})
            // actually let's navigate to the scheduled invites index page
            // the host can see the invites and the friend can then accept invite
            .then(res => {navigate(`/invites/`)})
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