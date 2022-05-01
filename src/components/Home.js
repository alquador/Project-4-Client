import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	const navigate = useNavigate()

	const signup = () => {
		navigate('/sign-up')
	}
	const signin = () => {
		navigate('/sign-in')
	}
	return (
		<>
			<div style={{  
  				backgroundImage: "url(https://www.flaschools.org/cms/lib/MN01909115/Centricity/Domain/770/alphabet-blocks-blur-591652.jpg)",
  				backgroundPosition: 'center',
				position: 'fixed',
				minHeight: '100%',
				minWidth: '100%',  
  				backgroundSize: 'cover',
  				backgroundRepeat: 'no-repeat',
			//   border: 'solid 3px black',
			
			}}>
			<h2 style={{
				textAlign:'center',
				margin: '100px 0px 20px 0px'
			}}>Come join in on the fun! </h2>
			<h4 style={{
				textAlign:'center'
			}}>Sign up/Sign in to invite a friend to meet!</h4>
				<Container style={{
				display: 'flex',
				justifyContent: 'center',
			}}>
				<button onClick={signup} className= 'm-2' id='sign-up'>
					Sign up 
				</button>
				<button onClick={signin} className= 'm-2' id='sign-in'> 
					Sign in
				</button>
			</Container>
			</div>
		</>
	)
}

export default Home
