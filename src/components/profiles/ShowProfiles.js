import React, {useState, useEffect, useRef} from 'react'
import { getOneProfile, removeProfile, updateProfile } from '../../api/profiles'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button, Row, Col } from 'react-bootstrap'
import EditProfileModal from './EditProfileModal'


const ShowProfiles = (props) => {
// setting state here
    const [profile, setProfile] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()

    console.log('props in showProfiles', props)

    const { id } = useParams()
    const {user} = props

    console.log('id in showProfiles', id)


    // put updated in the array so that the page will re-render every time we make an update and trigger the trigger refresh function
    useEffect(() => {
        console.log('id in showProfiles useEffect', id)
        console.log('user in showProfile useEffect', user)
        //calls the api to get a specific profile
        getOneProfile(user, id)
            .then(res => {
                console.log('Show profile res data', res.data.profile)
                setProfile(res.data.profile)
            })
            .catch(console.error)  
    }, [updated, id, user])

    //delete a profile
    const removeTheProfile = () => {
        removeProfile(user, id)
            .then(() => {navigate(`/profiles/`)})
            .catch(console.error)
    }

    //display a spinner if there isn't a profile
    if (!profile) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

        return (
            <>
            <Container className="fluid" id="showContainer">
                    <Card className='shadow p-3 mb-5 bg-body rounded mt-3'>
                        <Card.Header><h2 style={{
                            textAlign: 'center'
                        }}>{profile.name}</h2></Card.Header>
                        <Card.Body style={{
                            textAlign: 'center'
                        }}>
                            <Card.Text>
                                <Col>
                                    <small>Age: {profile.age}</small><br/>
                                </Col>
                                <Col>
                                    <small>About Me: {profile.about_me} </small><br/>
                                </Col>
                        </Card.Text>
                        
                    </Card.Body>
                    {/* if the user owns this profile allow them to edit, or delete it */}
                    {profile.user_id === user.id && 
                    <Card.Footer style={{
                        textAlign: 'center'
                    }}>
                            <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                                Edit Profile
                            </Button>
                            <Button className="m-2" variant="danger" onClick={removeTheProfile}>
                                Delete Profile
                            </Button>
    
                    </Card.Footer>                        
                    }
                </Card>
            </Container>
  
            {/* a pop up to edit the profile */}
            <EditProfileModal 
            profile = {profile}
            show={modalOpen}
            user={user}
            triggerRefresh={() => setUpdated(prev => !prev)}
            updateProfile={updateProfile}
            handleClose={() => setModalOpen(false)}
            />
            </>
        )
}

export default ShowProfiles