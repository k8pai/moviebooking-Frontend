import React, { useState, useContext } from 'react';
import CustomModal from './Modal';
import logo from '../assets/logo.svg';
import '../styles/Header.component.css';
import { backendApiContext } from '../context';
import { Link, useParams } from 'react-router-dom';
import { Button, Tabs, Tab, Box, TextField } from '@mui/material';

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

const Header = ({ showBookShowButton }) => {
	const { baseUrl } = useContext(backendApiContext);
	const { id } = useParams();

	const [state, setState] = useState({
		modalIsOpen: false,
		value: 0,
		loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
	});
	const [login, setLogin] = useState({
		username: '',
		password: '',
	});
	const [signUp, setSignUp] = useState({
		first_name: '',
		last_name: '',
		email_address: '',
		password: '',
		mobile_number: '',
	});

	const toggleModal = () => {
		if (state.modalIsOpen) {
			setState((ref) => ({ ...ref, modalIsOpen: false }));
		} else {
			setState((ref) => ({ ...ref, modalIsOpen: true }));
		}
	};

	const tabChangeHandler = (event, value) => {
		setState((ref) => ({ ...ref, value }));
	};

	const handleSignup = () => {
		fetch(`${baseUrl}auth/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache',
			},
			body: JSON.stringify(signUp),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	};

	const handleLogin = () => {
		fetch(`${baseUrl}auth/login`, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${window.btoa(
					login.username + ':' + login.password,
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
				toggleModal();
			})
			.catch((err) => console.log('Error: ', err));
	};

	const handleLogout = () => {
		fetch(`${baseUrl}auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache',
			},
			body: JSON.stringify({ uuid: sessionStorage.getItem('uuid') }),
		})
			.then((response) => response.json())
			.then((data) => {
				sessionStorage.removeItem('uuid');
				sessionStorage.removeItem('access-token');
				console.log(data);
			})
			.catch((err) => console.log(err));
	};

	const handleSignupChange = (event) => {
		const { name, value } = event.target;
		setSignUp((ref) => ({ ...ref, [name]: value }));
	};

	const handleLoginChange = (event) => {
		const { name, value } = event.target;
		setLogin((ref) => ({ ...ref, [name]: value }));
	};

	return (
		<div>
			<header className="app-header">
				<img src={logo} className="app-logo" alt="Movies App Logo" />
				{!state.loggedIn ? (
					<div className="login-button">
						<Button
							color="primary"
							variant="contained"
							onClick={toggleModal}
						>
							Login
						</Button>
					</div>
				) : (
					<div className="login-button">
						<Button
							color="default"
							variant="contained"
							onClick={handleLogout}
						>
							Logout
						</Button>
					</div>
				)}
				{showBookShowButton === 'true' && !state.loggedIn ? (
					<div className="bookshow-button">
						<Button
							color="primary"
							variant="contained"
							onClick={toggleModal}
						>
							Book Show
						</Button>
					</div>
				) : null}

				{showBookShowButton === 'true' && state.loggedIn ? (
					<div className="bookshow-button">
						<Link to={'/bookshow/' + id}>
							<Button variant="contained" color="primary">
								Book Show
							</Button>
						</Link>
					</div>
				) : null}
			</header>

			{/* modal of login and signup  */}
			<CustomModal isOpen={state.modalIsOpen} handleClose={toggleModal}>
				<Tabs
					className="tabs"
					value={state.value}
					onChange={tabChangeHandler}
					centered
				>
					<Tab label="Login" />
					<Tab label="Register" />
				</Tabs>

				{/* login tab  */}
				<TabPanel value={state.value} index={0}>
					<Box
						sx={{
							marginBottom: '15px',
						}}
					>
						<TextField
							required
							label="Username"
							id="username"
							name={'username'}
							type="text"
							sx={{ width: '100%' }}
							username={login.username}
							onChange={handleLoginChange}
						/>
					</Box>
					<Box
						sx={{
							marginBottom: '15px',
						}}
					>
						<TextField
							required
							label="Password"
							id="password"
							name={'password'}
							type="text"
							sx={{ width: '100%' }}
							password={login.password}
							onChange={handleLoginChange}
						/>
					</Box>
					<Box>
						<Button variant="contained" onClick={handleLogin}>
							Login
						</Button>
					</Box>
				</TabPanel>

				{/* signup tab */}
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
							id="first_name"
							name="first_name"
							type="text"
							sx={{ width: '100%', marginRight: '5px' }}
							firstName={signUp.first_name}
							onChange={handleSignupChange}
						/>
						<TextField
							required
							label="Last Name"
							id="last_name"
							name={'last_name'}
							type="text"
							sx={{ width: '100%', marginLeft: '5px' }}
							lastName={signUp.last_name}
							onChange={handleSignupChange}
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
							name={'email_address'}
							type="text"
							sx={{ width: '100%' }}
							email={signUp.email_address}
							onChange={handleSignupChange}
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
							onChange={handleSignupChange}
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
							name={'mobile_number'}
							contact={signUp.mobile_number}
							onChange={handleSignupChange}
						/>
					</Box>
					<Box>
						<Button variant="contained" onClick={handleSignup}>
							Sign Up
						</Button>
					</Box>
				</TabPanel>
			</CustomModal>
		</div>
	);
};

export default Header;
