import React, {useState, useEffect, useRef} from 'react'
import { getOneInvite, removeInvite, updateInvite } from '../../api/invites'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button, Row, Col } from 'react-bootstrap'
import EditInviteModal from './EditInviteModal'
import IndexProfiles from '../profiles/IndexProfiles'
import AcceptInviteModal from './AcceptInviteModal'


const ShowInvite = (props) => {
// setting state here
    const [invite, setInvite] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [acceptModalOpen, setAcceptModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()

    console.log('props in showInvites', props)

    const { id } = useParams()
    const {user} = props

    console.log('id in showInvite', id)


    // put updated in the array so that the page will re-render every time we make an update and trigger the trigger refresh function
    useEffect(() => {
        console.log('id in showInvites useEffect', id)
        console.log('user in showInvites useEffect', user)
        //calls the api to get a specific invite
        getOneInvite(user, id)
            .then(res => {
                console.log('Show invite res data', res.data.invite)
                setInvite(res.data.invite)
            })
            .catch(console.error)  
    }, [updated, id, user])

    //delete an invite
    const removeTheInvite = () => {
        removeInvite(user, id)
            .then(() => {navigate(`/invites/`)})
            .catch(console.error)
    }

    //display a spinner if there isn't an invite
    if (!invite) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

     if (user.id === invite.friend_id || invite.host_id === user.id)
        return (
            <>
            <Container className="fluid" id="showContainer">
                    <Card className='shadow p-3 mb-5 bg-body rounded mt-3'>
                        <Card.Header><h2 style={{
                            textAlign: 'center'
                        }}>{invite.title}</h2></Card.Header>
                        <Card.Body>
                            <Card.Text>
                            <Row>
                                <Col>
                                    <small>Date: {invite.date}</small><br/>
                                </Col>
                                <Col>
                                    <small>Time: {invite.time} </small><br/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <small>Location: {invite.location} </small><br/>
                                </Col>
                                <Col>
                                    <small>Details: {invite.details} </small><br/>
                                </Col>
                            </Row>
                            {/* <Row>
                                <Col>
                                    <small>Playdate Host: {invite.host_id} </small><br/>
                                </Col>
                                <Col>
                                    <small>Playdate Friend: {invite.friend_id} </small><br/>
                                </Col>
                            </Row> */}
                                <Col>
                                    <small>Accepted: {invite.accepted} </small><br/>
                                </Col>
                        </Card.Text>
                    
                    </Card.Body>
                    
                    {/* if the user owns this profile allow them to edit, or delete it */}
                    {/* {user.id === invite.host_id || invite.friend_id && */}
                    <Card.Footer style={{
                        textAlign: 'center'
                    }}>
                            {user.id === invite.friend_id &&
                            <Button onClick={() => setAcceptModalOpen(true)} className="m-2" variant="success">
                                Accept Invite
                            </Button>
                            }
                            {user.id === invite.friend_id &&
                            <Button className="m-2" variant="danger" onClick={removeTheInvite}>
                                Decline Invite
                            </Button>
                            }
                            {user.id === invite.host_id &&
                            <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                                Edit Invite
                            </Button>
                            }
                    </Card.Footer>                        
                    
                </Card>
            </Container>
  
            {/* a pop up to accept the invite */}
            <AcceptInviteModal 
            invite = {invite}
            show={acceptModalOpen}
            user={user}
            triggerRefresh={() => setUpdated(prev => !prev)}
            updateInvite={updateInvite}
            handleClose={() => setAcceptModalOpen(false)}
            />
            <EditInviteModal
            invite = {invite}
            show={modalOpen}
            user={user}
            triggerRefresh={() => setUpdated(prev => !prev)}
            updateInvite={updateInvite}
            handleClose={() => setModalOpen(false)}
            />
            </>
        )
}

export default ShowInvite