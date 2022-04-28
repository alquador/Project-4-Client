import apiUrl from '../apiConfig'
import axios from 'axios'
import ProfileForm from '../components/shared/ProfileForm'

// index function
export const getAllInvites = (user) => {
    console.log('user in get all invites', user)
    return axios({
        url: `${apiUrl}/invites/`,
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        }
    })
}

// index of user's invites function
export const getMyInvites = (user) => {
    return axios({
        url: `${apiUrl}/invites/mine/`,
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        }
    })
}

//index of a specific user's invites function
export const getOwnerInvites = (ownerId) => {
    return axios(`${apiUrl}/invites/user/${ownerId}/`)
}

//show function
export const getOneInvite = (user, inviteId) => {
    console.log('invite id in the axios call', inviteId)
    console.log('user in the axios call', user)
    return axios({
        //searching for the invite by the user_id fk
        url: `${apiUrl}/invites/${inviteId}/`,
        method: 'GET',
        headers: {
            Authorization: `Token ${user.token}`
        }
    })
}

// POST -> create function
export const createInvite = (user, newInvite) => {
    console.log('user', user)
    console.log('this is newInvite', newInvite)
    return axios({
        url: `${apiUrl}/invites/create/`,
        method: 'POST',
        headers: {
            Authorization: `Token ${user.token}`
        },
        data: { 
            invite: {
            title: newInvite.title,
            date: newInvite.date,
            time: newInvite.time,
            location: newInvite.location,
            details: newInvite.details,
            // accepted: newInvite.accepted,
            host: user.id,
            friend_id: 2
          } }
    })
}

// PATCH -> update function
export const updateInvite = (user, updatedInvite) => {
    console.log('user', user)
    console.log('this is updatedInvite', updatedInvite)
    return axios({
        url: `${apiUrl}/invites/${updatedInvite.id}/`,
        method: 'PATCH',
        headers: {
            Authorization: `Token ${user.token}`
        },
        data: { invite: updatedInvite }
    })
}

// DELETE -> remove function
export const removeInvite = (user, inviteId) => {
    console.log('user', user)
    console.log('invite id in delete route', inviteId)
    return axios({
        url: `${apiUrl}/invites/${inviteId}/delete/`,
        method: 'DELETE',
        headers: {
            Authorization: `Token ${user.token}`
        }
    })
}