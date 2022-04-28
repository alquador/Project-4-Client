import { Form, Container, Button, Row, Col } from 'react-bootstrap'

const InviteForm = (props) => {
    const {invite, handleChange, handleSubmit, heading} = props
    //console.log('invite in invite form', invite)
    //console.log('props in invite form', props)
    return (
        <Container className="justify-content-center" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <br></br>
            <h1>{heading}</h1>
            <br></br>
            <Form onSubmit={handleSubmit} className="m-2 p-5 w-100 shadow bg-body rounded">
            <Col>
                <Form.Label>Playdate: </Form.Label>
                <Form.Control 
                    style={{
                        width: '100%',
                        textAlign: 'center'
                    }}
                    placeholder="What Is The Title Of The Playdate?"
                    value={invite.title}
                    name='title'
                    onChange={handleChange}
                />
                </Col>
            <Row>
                <Col>
                    <Form.Label>Date: </Form.Label>
                    <Form.Control 
                        style={{
                            width: '100%',
                            textAlign: 'center'
                        }}
                        placeholder="When is the playdate? (YYYY-MM-DD)"
                        value={invite.date}
                        name='date'
                        type="date"
                        onChange={handleChange}
                />
                </Col>
                <Col>
                    <Form.Label>Time: </Form.Label>
                    <Form.Control
                        style={{
                        width: '100%',
                        textAlign: 'center'
                     }} 
                        placeholder="What time?"
                        value={invite.time}
                        name='time'
                        type="time"
                        onChange={handleChange}
                />
                </Col>
            </Row>
                <Form.Label>Location: </Form.Label>
                <Form.Control
                    style={{
                        width: '100%',
                        textAlign: 'center'
                    }} 
                    placeholder="Where is the playdate?"
                    value={invite.location}
                    name='location'
                    onChange={handleChange}
                />
                <br></br>
                <Form.Label>Details: </Form.Label>
                <Form.Control
                    style={{
                        width: '100%',
                        textAlign: 'center'
                    }} 
                    placeholder="Details of the playdate?"
                    value={invite.details}
                    name='details'
                    onChange={handleChange}
                />
                <br></br>
                <div style={{
                    justifyContent: 'center',
                    textAlign: 'left'
                }}>
                {['checkbox'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                        <Form.Check 
                            type={type}
                            id={invite.accepted}
                            label={`Accept Invite`}
                        />
                    </div>
                ))}
                </div>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default InviteForm