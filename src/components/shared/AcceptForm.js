import { Form, Container, Button, Row, Col } from 'react-bootstrap'

const AcceptForm = (props) => {
    const {invite, handleChange, handleSubmit, heading} = props
    //console.log('invite in invite form', invite)
    //console.log('props in invite form', props)
    return (
        <Container name="accept" className="justify-content-center" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <br></br>
            <h1>{heading}</h1>
            <br></br>
            <Form onSubmit={handleSubmit} className="m-2 p-5 w-100 shadow bg-body rounded">
            <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'left'
                }}>
                    <Form.Check 
                    label='We will be there!'
                    name='accepted'
                    defaultChecked={invite.accepted}
                    onChange={handleChange}
                />
                </div>
                <br></br>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default AcceptForm