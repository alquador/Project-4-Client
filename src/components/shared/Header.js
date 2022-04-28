import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		{/* moved the invite link to each profile */}
		{/* <Nav.Item className="m-2">
		    <Link to='addInvite' style={linkStyle}>Add Invite</Link>
        </Nav.Item> */}
		<Nav.Item className="m-2">
			<Link to='/invites' style={linkStyle}>
				Scheduled Playdates
			</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
			<Link  to='/profiles' style={linkStyle}>All Profiles</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
		    <Link to='addProfile' style={linkStyle}>Add Profile</Link>
        </Nav.Item>
		<Nav.Item className="m-2">
		    <Link to='/profiles/mine' style={linkStyle}>My Profiles</Link>
        </Nav.Item>
		<Nav.Item className="m-2">
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className="m-2">
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className="m-2">
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)


const Header = ({ user }) => (
	<Navbar sticky='top' className='custom-nav' bg='myBlue' variant='light' expand='md'>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user ? authenticatedOptions : unauthenticatedOptions}
				{user && (
					<span className='m-2'  style={{color: 'white', margin: 'auto'}}>Welcome, {user.email}</span>
					
					)}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
