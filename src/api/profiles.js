import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllProfiles = () => {
    return axios(`${apiUrl}/profiles`)
}

// index of user's profiles function
export const getMyProfiles = (user) => {
    return axios({
        url: `${apiUrl}/profiles/mine`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

//index of a specific user's profiles function
export const getOwnerProfiles = (ownerId) => {
    return axios(`${apiUrl}/profiles/user/${ownerId}`)
}

//show function
export const getOneProfile = (profileId) => {
    return axios(`${apiUrl}/profiles/${profileId}`)
}

// POST -> create function
export const createProfile = (user, newProfile) => {
    console.log('user', user)
    console.log('this is newProfile', newProfile)
    return axios({
        url: `${apiUrl}/profiles`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { profile: newProfile }
    })
}

// PATCH -> update function
export const updateProfile = (user, updatedProfile) => {
    console.log('user', user)
    console.log('this is updatedProfile', updatedProfile)
    return axios({
        url: `${apiUrl}/profiles/${updatedProfile._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { profile: updatedProfile }
    })
}

// DELETE -> remove function
export const removeProfile = (user, profileId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/profiles/${profileId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}