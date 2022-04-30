// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import CreateProfile from './components/profiles/CreateProfile'
import ShowProfiles from './components/profiles/ShowProfiles'
import MyProfiles from './components/profiles/MyProfiles'
import IndexProfiles from './components/profiles/IndexProfiles'
import OwnersProfiles from './components/profiles/OwnersProfiles'
import IndexInvites from './components/invites/IndexInvites'
import AcceptedInvites from './components/invites/AcceptedInvites'
import AcceptedShowInvite from './components/invites/AcceptedShowInvite'
import ShowInvite from './components/invites/ShowInvite'
import CreateInvite from './components/invites/CreateInvite'


const App = () => {

	const [user, setUser] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])
	// const [token, setToken] = useState(null)
	console.log('user in app', user)
	// console.log('setting the token', token)
	console.log('message alerts', msgAlerts)
	const clearUser = () => {
		//console.log('clear user ran')
		setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
					<Route path='/profiles/' element={<IndexProfiles msgAlert={msgAlert} user={user} />} />
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
          <Route
            path='/sign-out'
            element={
              <RequireAuth user={user}>
                <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
              </RequireAuth>
            }
          />
          <Route
            path='/change-password'
            element={
              <RequireAuth user={user}>
                <ChangePassword msgAlert={msgAlert} user={user} />
              </RequireAuth>}
          />

		  	<Route
				path='/addProfile'
				element={
					<RequireAuth user={user}>	
						<CreateProfile msgAlert={msgAlert} user={user} />
					</RequireAuth>}
			/>
			<Route
				path='/profiles/:id'
				element={<ShowProfiles msgAlert={msgAlert} user={user} />}
			/>
			<Route
				path='/profiles/user/:ownerId'
				element={<OwnersProfiles user={user} />}
			/>
			<Route
				path='/profiles/mine'
				element={
					<RequireAuth user={user}>
						<MyProfiles msgAlert={msgAlert} user={user} />
					</RequireAuth>}
			/>
			<Route 
				path='/invites' 
				element={<IndexInvites msgAlert={msgAlert} user={user} />} 
			/>

			<Route 
				path='/invites/accepted' 
				element={<AcceptedInvites msgAlert={msgAlert} user={user} />} 
			/>
			<Route 
				path='/invites/accepted/:id' 
				element={<AcceptedShowInvite msgAlert={msgAlert} user={user} />} 
			/>
			<Route
				path='/invites/:id'
				element={<ShowInvite msgAlert={msgAlert} user={user} />}
			/>
			
			<Route
				path='/addInvite'
				element={
					<RequireAuth user={user}>	
						<CreateInvite msgAlert={msgAlert} user={user} />
					</RequireAuth>}
			/>
			</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
			</Fragment>
		)
}

export default App
