import React, { useState, useContext } from 'react';
import './Header.css';
import {
	Button,
	Tabs,
	Tab,
	Typography,
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
} from '@mui/material';
// import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
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
import { backendApiContext } from '../../context';

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

export const TabContainer = ({ children }) => {
	return (
		<Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
			{children}
		</Typography>
	);
};

// TabContainer.propTypes = {
// 	children: PropTypes.node.isRequired,
// };

const Header = ({ showBookShowButton }) => {
	const { baseUrl } = useContext(backendApiContext);

	const { id } = useParams();
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
		console.log('value = ', value);
		setState({ value });
	};

	const loginClickHandler = () => {
		state.username === ''
			? setState({ usernameRequired: 'dispBlock' })
			: setState({ usernameRequired: 'dispNone' });
		state.loginPassword === ''
			? setState({ loginPasswordRequired: 'dispBlock' })
			: setState({ loginPasswordRequired: 'dispNone' });

		let dataLogin = null;
		let xhrLogin = new XMLHttpRequest();
		let that = this;
		xhrLogin.addEventListener('readystatechange', function() {
			if (this.readyState === 4) {
				sessionStorage.setItem(
					'uuid',
					JSON.parse(this.responseText).id,
				);
				//sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

				if (xhrLogin.getResponseHeader('access-token') == null) {
					sessionStorage.setItem(
						'access-token',
						JSON.parse(this.responseText)['access-token'],
					);
				}

				setState((el) => ({
					...el,
					loggedIn: true,
				}));

				closeModalHandler();
			}
		});

		xhrLogin.open('POST', baseUrl + 'auth/login');
		xhrLogin.setRequestHeader(
			'Authorization',
			'Basic ' + window.btoa(state.username + ':' + state.loginPassword),
		);
		xhrLogin.setRequestHeader('Content-Type', 'application/json');
		xhrLogin.setRequestHeader('Cache-Control', 'no-cache');

		xhrLogin.send(dataLogin);
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
			<Modal
				ariaHideApp={false}
				isOpen={state.modalIsOpen}
				contentLabel="Login"
				onRequestClose={closeModalHandler}
				style={customStyles}
			>
				<Tabs
					className="tabs"
					value={state.value}
					onChange={tabChangeHandler}
				>
					<Tab label="Login" />
					<Tab label="Register" />
				</Tabs>

				{state.value === 0 && (
					<TabContainer>
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
							<FormHelperText
								className={state.loginPasswordRequired}
							>
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
					</TabContainer>
				)}

				{state.value === 1 && (
					<TabContainer>
						<FormControl required>
							<InputLabel htmlFor="firstname">
								First Name
							</InputLabel>
							<Input
								id="firstname"
								type="text"
								firstname={state.firstname}
								onChange={inputFirstNameChangeHandler}
							/>
							<FormHelperText className={state.firstnameRequired}>
								<span className="red">required</span>
							</FormHelperText>
						</FormControl>
						<br />
						<br />
						<FormControl required>
							<InputLabel htmlFor="lastname">
								Last Name
							</InputLabel>
							<Input
								id="lastname"
								type="text"
								lastname={state.lastname}
								onChange={inputLastNameChangeHandler}
							/>
							<FormHelperText className={state.lastnameRequired}>
								<span className="red">required</span>
							</FormHelperText>
						</FormControl>
						<br />
						<br />
						<FormControl required>
							<InputLabel htmlFor="email">Email</InputLabel>
							<Input
								id="email"
								type="text"
								email={state.email}
								onChange={inputEmailChangeHandler}
							/>
							<FormHelperText className={state.emailRequired}>
								<span className="red">required</span>
							</FormHelperText>
						</FormControl>
						<br />
						<br />
						<FormControl required>
							<InputLabel htmlFor="registerPassword">
								Password
							</InputLabel>
							<Input
								id="registerPassword"
								type="password"
								registerpassword={state.registerPassword}
								onChange={inputRegisterPasswordChangeHandler}
							/>
							<FormHelperText
								className={state.registerPasswordRequired}
							>
								<span className="red">required</span>
							</FormHelperText>
						</FormControl>
						<br />
						<br />
						<FormControl required>
							<InputLabel htmlFor="contact">
								Contact No.
							</InputLabel>
							<Input
								id="contact"
								type="text"
								contact={state.contact}
								onChange={inputContactChangeHandler}
							/>
							<FormHelperText className={state.contactRequired}>
								<span className="red">required</span>
							</FormHelperText>
						</FormControl>
						<br />
						<br />
						{state.registrationSuccess === true && (
							<FormControl>
								<span className="successText">
									Registration Successful. Please Login!
								</span>
							</FormControl>
						)}
						<br />
						<br />
						<Button
							variant="contained"
							color="primary"
							onClick={registerClickHandler}
						>
							REGISTER
						</Button>
					</TabContainer>
				)}
			</Modal>
		</div>
	);
};

export default Header;
