import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllProfiles = (user) => {
    console.log('user in get all profiles', user)
    return axios({
        url: `${apiUrl}/profiles/`,
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        }
    })
}

// index of user's profiles function
export const getMyProfiles = (user) => {
    return axios({
        url: `${apiUrl}/profiles/mine/`,
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        }
    })
}
// index of owner's profiles function
export const getOwnerProfiles = (user) => {
    return axios({
        url: `${apiUrl}/profiles/owner/`,
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        }
    })
}

//show function
export const getOneProfile = (user, profileId) => {
    //console.log('profile id in the axios call', profileId)
    console.log('user in the axios call', user)
    return axios({
        //searching for the profile by the user_id fk
        url: `${apiUrl}/profiles/${profileId}/`,
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        }
    })
}

// POST -> create function
export const createProfile = (user, newProfile, newProfileId) => {
    console.log('user', user)
    console.log('this is newProfile', newProfile)
    console.log('this is newProfile', newProfileId)
    return axios({
        url: `${apiUrl}/profiles/create/`,
        method: 'POST',
        headers: {
            Authorization: `Token ${user.token}`
        },
        data: { profile: {
            name: newProfile.name,
            age: newProfile.age,
            about_me: newProfile.about_me,
            // user_id: newProfile.user_id
         }
    }})
}

// PATCH -> update function
export const updateProfile = (user, updatedProfile) => {
    console.log('user', user)
    console.log('this is updatedProfile', updatedProfile)
    return axios({
        url: `${apiUrl}/profiles/${updatedProfile.id}/`,
        method: 'PATCH',
        headers: {
            Authorization: `Token ${user.token}`
        },
        data: { profile: updatedProfile }
    })
}

// DELETE -> remove function
export const removeProfile = (user, profileId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/profiles/${profileId}/delete/`,
        method: 'DELETE',
        headers: {
            Authorization: `Token ${user.token}`
        }
    })
}