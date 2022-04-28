import React, { useState } from 'react'
import { createProfile } from '../../api/profiles'
import { createProfileFailure } from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'
import ProfileForm from '../shared/ProfileForm'

const CreateProfile = (props) => {
    const {user, msgAlert} = props
    // console.log('user in create', user)
    const navigate = useNavigate()
    // we'll need two states
    const [profile, setProfile] = useState({name: '', age: '', aboutMe: ''})
    //console.log('profile in create', profile)

    const handleChange = (e) => {
        // e === event
        e.persist()
        //set Profile to the new values returned by the input fields
        setProfile(prevProfile => {
            const name = e.target.name
            let value = e.target.value
            //console.log('etarget type', e.target.type)
            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
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
        //api call to create a new profile
        createProfile(user, profile)
            // if create is successful, we should navigate to the show page
            .then(res => {navigate(`/profiles/${res.data.profile._id}/`)})
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createProfileFailure,
                    variant: 'danger',
                }))
         console.log('this is the profile', profile)
    }

    return (
        <ProfileForm 
            profile={profile}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Add New Profile!"
        />
    )
}

export default CreateProfile