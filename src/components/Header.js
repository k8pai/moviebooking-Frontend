import React, { useState, useContext } from 'react';
import '../styles/Header.component.css';
import {
	Button,
	Tabs,
	Tab,
	Typography,
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
	Box,
	TextField,
} from '@mui/material';
// import Button from '@material-ui/core/Button';
import logo from '../assets/logo.svg';
import Modal from 'react-modal';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import Input from '@material-ui/core/Input';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { backendApiContext } from '../context';
import CustomModal from './Modal';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ textAlign: 'center', width: '100%' }}>
					{children}
				</Box>
			)}
		</div>
	);
}

// TabContainer.propTypes = {
// 	children: PropTypes.node.isRequired,
// };

const Header = ({ showBookShowButton }) => {
	const { baseUrl } = useContext(backendApiContext);

	const { id } = useParams();
	const [signUp, setSignUp] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		contactNumber: '',
	});
	const [state, setState] = useState({
		modalIsOpen: false,
		value: 0,
		usernameRequired: 'dispNone',
		username: '',
		loginPasswordRequired: 'dispNone',
		loginPassword: '',
		firstnameRequired: 'dispNone',
		firstname: '',
		lastnameRequired: 'dispNone',
		lastname: '',
		emailRequired: 'dispNone',
		email: '',
		registerPasswordRequired: 'dispNone',
		registerPassword: '',
		contactRequired: 'dispNone',
		contact: '',
		registrationSuccess: false,
		loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
	});

	const toggleModal = () => {
		setState((ref) => ({ ...ref, modalIsOpen: !ref.modalIsOpen }));
	};

	const openModalHandler = () => {
		setState({
			modalIsOpen: true,
			value: 0,
			usernameRequired: 'dispNone',
			username: '',
			loginPasswordRequired: 'dispNone',
			loginPassword: '',
			firstnameRequired: 'dispNone',
			firstname: '',
			lastnameRequired: 'dispNone',
			lastname: '',
			emailRequired: 'dispNone',
			email: '',
			registerPasswordRequired: 'dispNone',
			registerPassword: '',
			contactRequired: 'dispNone',
			contact: '',
		});
	};

	const closeModalHandler = () => {
		setState((el) => ({
			...el,
			modalIsOpen: false,
		}));
	};

	const tabChangeHandler = (event, value) => {
		setState((ref) => ({ ...ref, value }));
	};

	const loginClickHandler = () => {
		state.username === ''
			? setState({ usernameRequired: 'dispBlock' })
			: setState({ usernameRequired: 'dispNone' });
		state.loginPassword === ''
			? setState({ loginPasswordRequired: 'dispBlock' })
			: setState({ loginPasswordRequired: 'dispNone' });

		fetch(`${baseUrl}auth/login`, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${window.btoa(
					state.username + ':' + state.loginPassword,
				)}`,
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				sessionStorage.setItem('uuid', JSON.parse(data.id));
				sessionStorage.setItem(
					'access-token',
					JSON.parse(data['access-token']),
				);
				setState((ref) => ({ ...ref, loggedIn: true }));
				console.log(data);
				closeModalHandler();
			})
			.catch((err) => console.log('Error: ', err));

		// let dataLogin = null;
		// let xhrLogin = new XMLHttpRequest();
		// let that = this;
		// xhrLogin.addEventListener('readystatechange', function() {
		// 	if (this.readyState === 4) {
		// 		sessionStorage.setItem(
		// 			'uuid',
		// 			JSON.parse(this.responseText).id,
		// 		);
		// 		//sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

		// 		if (xhrLogin.getResponseHeader('access-token') == null) {
		// 			sessionStorage.setItem(
		// 				'access-token',
		// 				JSON.parse(this.responseText)['access-token'],
		// 			);
		// 		}

		// 		setState((el) => ({
		// 			...el,
		// 			loggedIn: true,
		// 		}));

		// 		closeModalHandler();
		// 	}
		// });

		// xhrLogin.open('POST', baseUrl + 'auth/login');
		// xhrLogin.setRequestHeader(
		// 	'Authorization',
		// 	'Basic ' + window.btoa(state.username + ':' + state.loginPassword),
		// );
		// xhrLogin.setRequestHeader('Content-Type', 'application/json');
		// xhrLogin.setRequestHeader('Cache-Control', 'no-cache');

		// xhrLogin.send(dataLogin);
	};

	const inputUsernameChangeHandler = (e) => {
		setState((el) => ({
			...el,
			username: e.target.value,
		}));
	};

	const inputLoginPasswordChangeHandler = (e) => {
		setState((el) => ({
			...el,
			loginPassword: e.target.value,
		}));
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setSignUp((ref) => ({ ...ref, [name]: value }));
	};

	const registerClickHandler = () => {
		state.firstname === ''
			? setState({ firstnameRequired: 'dispBlock' })
			: setState({ firstnameRequired: 'dispNone' });
		state.lastname === ''
			? setState({ lastnameRequired: 'dispBlock' })
			: setState({ lastnameRequired: 'dispNone' });
		state.email === ''
			? setState({ emailRequired: 'dispBlock' })
			: setState({ emailRequired: 'dispNone' });
		state.registerPassword === ''
			? setState({ registerPasswordRequired: 'dispBlock' })
			: setState({ registerPasswordRequired: 'dispNone' });
		state.contact === ''
			? setState({ contactRequired: 'dispBlock' })
			: setState({ contactRequired: 'dispNone' });

		let dataSignup = JSON.stringify({
			email_address: state.email,
			first_name: state.firstname,
			last_name: state.lastname,
			mobile_number: state.contact,
			password: state.registerPassword,
		});

		let xhrSignup = new XMLHttpRequest();
		let that = this;
		xhrSignup.addEventListener('readystatechange', function() {
			if (this.readyState === 4) {
				setState((el) => ({
					...el,
					registrationSuccess: true,
				}));
			}
		});

		xhrSignup.open('POST', baseUrl + 'auth/signup');
		xhrSignup.setRequestHeader('Content-Type', 'application/json');
		xhrSignup.setRequestHeader('Cache-Control', 'no-cache');
		xhrSignup.send(dataSignup);
	};

	const inputFirstNameChangeHandler = (e) => {
		setState({ firstname: e.target.value });
	};

	const inputLastNameChangeHandler = (e) => {
		setState({ lastname: e.target.value });
	};

	const inputEmailChangeHandler = (e) => {
		setState({ email: e.target.value });
	};

	const inputRegisterPasswordChangeHandler = (e) => {
		setState({ registerPassword: e.target.value });
	};

	const inputContactChangeHandler = (e) => {
		setState({ contact: e.target.value });
	};

	const logoutHandler = (e) => {
		// Mofification By Mahesh Panhale

		let dataSignout = JSON.stringify({
			uuid: sessionStorage.getItem('uuid'),
		});

		let xhrSignout = new XMLHttpRequest();
		let that = this;
		xhrSignout.addEventListener('readystatechange', function() {
			if (this.readyState === 4) {
				if (
					JSON.parse(this.responseText).message ===
					'Logged Out successfully.'
				) {
					sessionStorage.removeItem('uuid');
					sessionStorage.removeItem('access-token');

					setState((el) => ({
						...el,
						loggedIn: false,
					}));
				}
			}
		});

		xhrSignout.open('POST', baseUrl + 'auth/logout');
		xhrSignout.setRequestHeader('Content-Type', 'application/json');
		xhrSignout.setRequestHeader('Cache-Control', 'no-cache');
		xhrSignout.send(dataSignout);
	};
	return (
		<div>
			<header className="app-header">
				<img src={logo} className="app-logo" alt="Movies App Logo" />
				{!state.loggedIn ? (
					<div className="login-button">
						<Button
							variant="contained"
							color="primary"
							onClick={openModalHandler}
						>
							Login
						</Button>
					</div>
				) : (
					<div className="login-button">
						<Button
							variant="contained"
							color="default"
							onClick={logoutHandler}
						>
							Logout
						</Button>
					</div>
				)}
				{showBookShowButton === 'true' && !state.loggedIn ? (
					<div className="bookshow-button">
						<Button
							variant="contained"
							color="primary"
							onClick={openModalHandler}
						>
							Book Show
						</Button>
					</div>
				) : (
					''
				)}

				{showBookShowButton === 'true' && state.loggedIn ? (
					<div className="bookshow-button">
						<Link to={'/bookshow/' + id}>
							<Button variant="contained" color="primary">
								Book Show
							</Button>
						</Link>
					</div>
				) : (
					''
				)}
			</header>
			<CustomModal
				isOpen={state.modalIsOpen}
				handleClose={() =>
					setState((ref) => ({ ...ref, modalIsOpen: false }))
				}
			>
				<Tabs
					className="tabs"
					value={state.value}
					onChange={tabChangeHandler}
					centered
				>
					<Tab label="Login" />
					<Tab label="Register" />
				</Tabs>

				<TabPanel value={state.value} index={0}>
					<FormControl required>
						<InputLabel htmlFor="username">Username</InputLabel>
						<Input
							id="username"
							type="text"
							username={state.username}
							onChange={inputUsernameChangeHandler}
						/>
						<FormHelperText className={state.usernameRequired}>
							<span className="red">required</span>
						</FormHelperText>
					</FormControl>
					<br />
					<br />
					<FormControl required>
						<InputLabel htmlFor="loginPassword">
							Password
						</InputLabel>
						<Input
							id="loginPassword"
							type="password"
							loginpassword={state.loginPassword}
							onChange={inputLoginPasswordChangeHandler}
						/>
						<FormHelperText className={state.loginPasswordRequired}>
							<span className="red">required</span>
						</FormHelperText>
					</FormControl>
					<br />
					<br />
					{state.loggedIn === true && (
						<FormControl>
							<span className="successText">
								Login Successful!
							</span>
						</FormControl>
					)}
					<br />
					<br />
					<Button
						variant="contained"
						color="primary"
						onClick={loginClickHandler}
					>
						LOGIN
					</Button>
				</TabPanel>

				<TabPanel value={state.value} index={1}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-evenly',
							marginBottom: '15px',
						}}
					>
						<TextField
							required
							label="First Name"
							id="firstName"
							type="text"
							sx={{ width: '100%', marginRight: '5px' }}
							firstName={signUp.firstName}
							onChange={handleChange}
						/>
						<TextField
							required
							label="Last Name"
							id="lastName"
							name={'lastName'}
							type="text"
							sx={{ width: '100%', marginLeft: '5px' }}
							lastName={signUp.lastName}
							onChange={handleChange}
						/>
					</Box>

					<Box
						sx={{
							marginBottom: '15px',
						}}
					>
						<TextField
							required
							label="Email"
							id="email"
							name={'email'}
							type="text"
							sx={{ width: '100%' }}
							email={signUp.email}
							onChange={handleChange}
						/>
					</Box>
					<Box
						sx={{
							marginBottom: '15px',
						}}
					>
						<TextField
							required
							id="password"
							label="password"
							type="password"
							name={'password'}
							sx={{ width: '100%' }}
							autoComplete="current-password"
							password={signUp.password}
							onChange={handleChange}
						/>
					</Box>
					<Box
						sx={{
							marginBottom: '15px',
						}}
					>
						<TextField
							required
							label="Contact No."
							id="contact"
							type="text"
							sx={{ width: '100%' }}
							name={'contactNumber'}
							contact={signUp.contactNumber}
							onChange={handleChange}
						/>
					</Box>
					<Box>
						<Button variant="contained">Sign Up</Button>
					</Box>
				</TabPanel>
			</CustomModal>
		</div>
	);
};

export default Header;
