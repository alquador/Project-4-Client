import React, { useState, useEffect } from 'react'
import { getAllInvites } from '../../api/invites'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


// use basic CSS, but we have to use JS syntax
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexInvites = (props) => {
    const [invites, setInvites] = useState(null)
    const { user, host } = props

    useEffect(() => {
        //api call to get all invites
        // console.log('user in useEffect console firing', user)
        getAllInvites(user, host)
            .then(res => {
                console.log(res.data.invites)
                setInvites(res.data.invites)
            })
            .catch(console.error)
    }, [user, host])

    
    //loading screen while api call happens
    if (!invites) {
        return <p>loading...</p>
    } else if (invites.length === 0) {
        return <p>no invites yet, go add some</p>
    }

    let inviteCards

    if (invites) {
        inviteCards = invites.map(invite => {
            return (
                <Card key={invite._id} style={{width: '30%' }} className="m-2 shadow p-3 mb-5 bg-body rounded">
                    <Card.Header> {invite.title} </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Link className='viewInvite' to={`/invites/${invite.id}`}>View {invite.details}</Link>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {/* link to all invites made by a specific user */}
                        {/* <span>Accept:</span><Link to={`/invites/${host.id}`}>{invite.accepted}</Link> */}
                    </Card.Footer>
                </Card>
            )
        })

        }

    return (
        <>
        <br></br>
            <div className= 'title'><h1>All Invites</h1></div>
            <div style={cardContainerLayout}>
                {inviteCards}
            </div>
        </>
    )
}

export default IndexInvites