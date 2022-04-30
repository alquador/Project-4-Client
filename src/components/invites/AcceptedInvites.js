import React, { useState, useEffect } from 'react'
import { getAcceptedInvites } from '../../api/invites'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


// use basic CSS, but we have to use JS syntax
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const AcceptedInvites = (props) => {
    const [invites, setInvites] = useState(null)
    const { user, host } = props

    useEffect(() => {
        //api call to get all invites
        console.log('user in useEffect console firing ACCEPTED INVITES', user)
        getAcceptedInvites(user, host)
            .then(res => {
                console.log(res.data.invites)
                setInvites(res.data.invites)
            })
            .catch(console.error)
    }, [user, host])

    
    //loading screen while api call happens
    //or there are no invites 
    if (!invites) {
        return <p>loading...</p>
    } else if (invites.length === 0) {
        return <p>no invites yet, go add some</p>
    }

    let inviteCards
    // if invites are true
    if (invites) {
        inviteCards = invites.map(invite => {
            // show only invites that were accepted
            if (invite.host_id === user.id || invite.friend_id === user.id)
            if (invite.accepted === true) 
            return (
                
                <Card key={invite._id} style={{width: '30%' }} className="m-2 shadow p-3 mb-5 bg-body rounded">
                    
                    <Card.Header style={{
                        textAlign: 'center'
                    }}> {invite.title} </Card.Header>
                    <Card.Body style={{
                        textAlign: 'center'
                    }}>
                        <Card.Text>
                            <Link className='viewInvite' to={`/invites/accepted/${invite.id}`}>View {invite.details}</Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })

        }

    return (
        <>
        <br></br>
            <div className= 'title'>
                <h1 style={{
                    textAlign: 'center'
                }}>Scheduled Playdates</h1></div>
            <div style={cardContainerLayout}>
                {inviteCards}
            </div>
        </>
    )
}

export default AcceptedInvites