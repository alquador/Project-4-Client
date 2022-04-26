import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOwnerProfiles } from '../../api/profiles'
import { Card, Spinner, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const OwnersProfiles = (props) => {
    const [ownersProfiles, setOwnersProfiles] = useState(null)

    const {user} = props

    const {ownerId} = useParams()

    useEffect(() => {
        console.log('user id', user._id)
        //api call to get all profiles created by a specific user
        getOwnerProfiles(ownerId)
            .then(res => {
                // console.log('res.data', res.data)
                setOwnersProfiles(res.data.profiles)
            })
            .catch(console.error)
            
    }, [user, ownerId])

    
    if (!ownersProfiles) {
        return ( 
                <Container fluid className='' >
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Container>
        )
    }
    if (ownersProfiles.length === 0) {
        return (
            <div> 
                <p>Could not find profiles by that user.</p>
            </div>
        )
    }

    let profileCards

    if (ownersProfiles.length > 0) {
        profileCards = ownersProfiles.map(profile => {
               
            return (
                <Card key={profile._id} style={{width: '30%' }} className="m-2 shadow p-3 mb-5 bg-body rounded">
                    <Card.Header>{profile.name} </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Link className='viewProfile' to={`/profiles/${profile._id}`}>View {profile.name}</Link>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <span>by:</span><Link to={`/profiles/user/${profile.owner._id}`}>{profile.owner.email}</Link>
                    </Card.Footer>
                </Card>
            )
        })
    }

    return (
        <>
            <div className='title'><h1> Profiles </h1></div>
            <div style={cardContainerLayout}>
                {profileCards}
            </div>
        </>
    )
}

export default OwnersProfiles