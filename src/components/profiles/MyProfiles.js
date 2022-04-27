import React, { useState, useEffect } from 'react'
import { getMyProfiles } from '../../api/profiles'
import { Card, Spinner, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const MyProfiles = (props) => {
    const [myProfiles, setMyProfiles] = useState(null)

    const {user} = props

    useEffect(() => {
        console.log('user id', user.id)
        //api call to get all profiles made by the current user
        getMyProfiles(user)
            .then(res => {
                console.log('res.data', res.data)
                setMyProfiles(res.data.profiles)
            })
            .catch(console.error)
            
    }, [user])

    
    if (!myProfiles) {
        return ( 
                <Container fluid className='' >
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Container>
        )
    }
    if (myProfiles.length === 0) {
        return (
            <div>
                <h3> My Profiles</h3>   
                <p>You have no profiles, go add some!</p>
            </div>
        )
    }

    let profileCards

    if (myProfiles.length > 0) {
        profileCards = myProfiles.map(profile => {
               
            return (
                <Card key={profile._id} style={{width: '30%' }} className="m-2 shadow p-3 mb-5 bg-body rounded">
                    <Card.Header>{profile.name} </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Link className='viewProfile' to={`/profiles/${profile._id}/`}>View {profile.name}</Link>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <span>by:</span><Link to={`/profiles/user/${profile.owner._id}/`}>{profile.owner.email}</Link>
                    </Card.Footer>
                </Card>
            )
        })
    }

    return (
        <>
        <br></br>
           <div className='title'><h1>My Profiles</h1></div>
            <div style={cardContainerLayout}>
                {profileCards}
            </div>
        </>
    )
}

export default MyProfiles