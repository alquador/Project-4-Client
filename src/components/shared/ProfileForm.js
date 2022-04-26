import { Form, Container, Button, Row, Col } from 'react-bootstrap'

const ProfileForm = (props) => {
    const {profile, handleChange, handleSubmit, heading} = props

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
            <Row>
                <Col>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    style={{
                        width: '100%',
                        textAlign: 'center'
                    }}
                    placeholder="What is The Name of Your Profile"
                    value={profile.name}
                    name='name'
                    onChange={handleChange}
                />
                </Col>
                <Col>
                
                <Form.Label>Age</Form.Label>
                <Form.Control 
                    style={{
                        width: '100%',
                        textAlign: 'center'
                    }}
                    placeholder="How old is the child"
                    value={profile.age}
                    name='age'
                    type="number"
                    onChange={handleChange}
                />
                
                </Col>
            </Row>
                <Form.Label>About Me: </Form.Label>
                <Form.Control
                    style={{
                        width: '100%',
                        textAlign: 'center'
                    }} 
                    placeholder="Tell us a little bit about the child?"
                    value={profile.aboutMe}
                    name='aboutMe'
                    onChange={handleChange}
                />
           
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default ProfileForm