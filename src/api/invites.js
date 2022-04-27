import apiUrl from '../apiConfig'
import axios from 'axios'

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
        url: `${apiUrl}/invites/`,
        method: 'POST',
        headers: {
            Authorization: `Token ${user.token}`
        },
        data: { invite: newInvite }
    })
}

// PATCH -> update function
export const updateInvite = (user, updatedInvite) => {
    console.log('user', user)
    console.log('this is updatedInvite', updatedInvite)
    return axios({
        url: `${apiUrl}/invites/${updatedInvite._id}/`,
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
    return axios({
        url: `${apiUrl}/invites/${inviteId}/`,
        method: 'DELETE',
        headers: {
            Authorization: `Token ${user.token}`
        }
    })
}