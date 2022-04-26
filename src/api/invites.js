import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllInvites = () => {
    return axios(`${apiUrl}/invites/`)
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
export const getOneInvite = (inviteId) => {
    return axios(`${apiUrl}/invites/${inviteId}/`)
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