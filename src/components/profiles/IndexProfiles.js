import React, { useState, useEffect } from 'react'
import { getAllProfiles } from '../../api/profiles'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


// use basic CSS, but we have to use JS syntax
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexProfiles = (props) => {
    const [profiles, setProfiles] = useState(null)
    const {user} = props
    // const [msgAlerts, setMsgAlerts] = useState([])

    // const msgAlert = ({ heading, message, variant }) => {
	// 	const id = uuid()
	// 	setMsgAlerts(() => {
	// 		return (
	// 			[{ heading, message, variant, id }]
    //   )
	// 	})
	// }

    useEffect(() => {
        //api call to get all profiles
        // console.log('user in useEffect console firing', user)
        getAllProfiles(user)
            .then(res => {
                console.log(res.data.profiles)
                setProfiles(res.data.profiles)
            })
            .catch(console.error)
    }, [user])

    
    //loading screen while api call happens
    if (!profiles) {
        return <p>loading...</p>
    } else if (profiles.length === 0) {
        return <p>no profiles yet, go add some</p>
    }

    let profileCards

    if (profiles) {
        profileCards = profiles.map(profile => {
            if (profile.user_id != user.id)
            return (
                <Card key={profile._id} style={{width: '30%' }} className="m-2 shadow p-3 mb-5 bg-body rounded">
                    <Card.Header style={{
                        textAlign: 'center'
                    }}>Age: {profile.age} </Card.Header>
                    <Card.Body style={{
                        textAlign: 'center'
                    }}>
                        <Card.Text>
                            <Link className='viewProfile' to={`/profiles/${profile.id}`}>{profile.name}'s Profile</Link>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer style={{
                        textAlign: 'center'
                    }}>
                        {/* link to create an invite */}
                        <span>Schedule Playdate with: </span>
                            <Link class="link-success" className="invite" to={`/addInvite/`}>{profile.name}</Link>
                    </Card.Footer>
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
                }}>All Profiles</h1></div>
            <div style={cardContainerLayout}>
                {profileCards}
            </div>
        </>
    )
}

export default IndexProfiles