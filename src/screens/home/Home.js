import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import {
	Typography,
	Grid,
	Card,
	CardContent,
	FormControl,
	InputLabel,
	Input,
	Select,
	MenuItem,
	Checkbox,
	ListItemText,
	TextField,
	Button,
} from '@mui/material';
// import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import FormControl from '@material-ui/core/FormControl';
// import Typography from '@material-ui/core/Typography';
// import InputLabel from '@material-ui/core/InputLabel';
// import Input from '@material-ui/core/Input';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import Checkbox from '@material-ui/core/Checkbox';
// import ListItemText from '@material-ui/core/ListItemText';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import { backendApiContext } from '../../context';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
	components: {
		MuiTypography: {
			variants: [
				{
					props: {
						variant: 'body2',
					},
					style: {
						textAlign: 'center',
						background: '#ff9999',
						padding: '8px',
						fontSize: '1rem',
					},
				},
				{
					props: {
						variant: 'subtitle1',
					},
					style: {
						color: red[400],
					},
				},
			],
		},
		MuiGrid: {
			variants: [
				{
					props: {
						variant: 'gridListUpcomingMovies',
					},
					style: {
						flexWrap: 'nowrap',
						transform: 'translateZ(0)',
						width: '100%',
					},
				},
				{
					props: {
						variant: 'gridListMain',
					},
					style: {
						transform: 'translateZ(0)',
						cursor: 'pointer',
					},
				},
			],
		},
		MuiFormControl: {
			variants: [
				{
					props: {
						variant: 'formControl',
					},
					style: {
						margin: '10px',
						minWidth: 240,
						maxWidth: 240,
					},
				},
			],
		},
	},
});

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	upcomingMoviesHeading: {
		textAlign: 'center',
		background: '#ff9999',
		padding: '8px',
		fontSize: '1rem',
	},
	gridListUpcomingMovies: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
		width: '100%',
	},
	gridListMain: {
		transform: 'translateZ(0)',
		cursor: 'pointer',
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 240,
		maxWidth: 240,
	},
	title: {
		color: theme.palette.primary.light,
	},
});

const Home = () => {
	const classes = styles;
	const { baseUrl } = useContext(backendApiContext);
	const [state, setState] = useState({
		movieName: '',
		upcomingMovies: [],
		releasedMovies: [],
		genres: [],
		artists: [],
		genresList: [],
		artistsList: [],
		releaseDateStart: '',
		releaseDateEnd: '',
	});

	useEffect(() => {
		// Get upcoming movies
		fetch(`${baseUrl}movies?status=PUBLISHED`, {
			method: 'GET',
			headers: {
				'Cache-Control': 'no-cache',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Get upcoming movies', data.movies);
				setState((el) => ({
					...el,
					upcomingMovies: data.movies,
				}));
			})
			.catch((err) => console.log(`Error: ${err}`));

		// Get Released movies
		fetch(`${baseUrl}movies?status=RELEASED`, {
			method: 'GET',
			headers: {
				'Cache-Control': 'no-cache',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Get Released movies');
				setState((el) => ({
					...el,
					releasedMovies: data.movies,
				}));
			})
			.catch((err) => console.log(`Error: ${err}`));

		// Get genres
		fetch(`${baseUrl}genres`, {
			method: 'GET',
			headers: {
				'Cache-Control': 'no-cache',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setState((el) => ({
					...el,
					genresList: data.genres,
				}));
			})
			.catch((err) => console.log(`Error: ${err}`));

		// Get artists
		fetch(`${baseUrl}artists`, {
			method: 'GET',
			headers: {
				'Cache-Control': 'no-cache',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setState((el) => ({
					...el,
					artistsList: data.artists,
				}));
			})
			.catch((err) => console.log(`Error: ${err}`));
	}, []);

	useEffect(() => {
		console.log('upcoming movies = ', state.upcomingMovies);
	}, [state.upcomingMovies]);

	const handleChange = (event) => {
		const { name } = event.target;
		console.log(name, event.target.value);
		setState((el) => ({
			...el,
			[name]: event.target.value,
		}));
	};

	const genreSelectHandler = (event) => {
		setState({ genres: event.target.value });
	};

	const artistSelectHandler = (event) => {
		setState({ artists: event.target.value });
	};

	// const releaseDateStartHandler = (event) => {
	// 	setState({ releaseDateStart: event.target.value });
	// };

	const releaseDateEndHandler = (event) => {
		setState({ releaseDateEnd: event.target.value });
	};

	// const movieClickHandler = (id) => {
	// 	//Changed /movie/id to /movies/id
	// 	props.history.push('movie/' + id);
	// };

	const filterApplyHandler = () => {
		let queryString = '?status=RELEASED';
		if (state.movieName !== '') {
			queryString += '&title=' + state.movieName;
		}
		if (state.genres.length > 0) {
			queryString += '&genres=' + state.genres.toString();
		}
		if (state.artists.length > 0) {
			queryString += '&artists=' + state.artists.toString();
		}
		if (state.releaseDateStart !== '') {
			queryString += '&start_date=' + state.releaseDateStart;
		}
		if (state.releaseDateEnd !== '') {
			queryString += '&end_date=' + state.releaseDateEnd;
		}

		let dataFilter = null;
		let xhrFilter = new XMLHttpRequest();

		xhrFilter.open('GET', baseUrl + 'movies' + encodeURI(queryString));
		xhrFilter.setRequestHeader('Cache-Control', 'no-cache');
		xhrFilter.send(dataFilter);

		xhrFilter.addEventListener('readystatechange', function() {
			if (this.readyState === 4) {
				setState((el) => ({
					...el,
					releasedMovies: JSON.parse(this.responseText).movies,
				}));
			}
		});
	};
	return (
		<div>
			<Header />
			<ThemeProvider theme={theme}>
				<Typography variant="body2" component="h4">
					Upcoming Movies
				</Typography>
				{state.upcomingMovies && (
					<Grid
						container
						spacing={2}
						cols={5}
						variant={'gridListUpcomingMovies'}
						className={classes.gridListUpcomingMovies}
					>
						{state.upcomingMovies.map((movie) => (
							<Grid item key={'upcoming' + movie._id}>
								<img
									src={movie.poster_url}
									className="movie-poster"
									alt={movie.title}
								/>
								<Grid title={movie.title} />
							</Grid>
						))}
					</Grid>
				)}
				<div className="flex-container">
					<div className="left">
						<Grid
							cellHeight={350}
							cols={4}
							container
							spacing={2}
							variant={'gridListMain'}
							className={classes.gridListMain}
						>
							{state.releasedMovies.map((movie) => (
								<Grid
									item
									// onClick={() =>
									// movieClickHandler(movie.movieid)
									// }
									className="released-movie-grid-item"
									key={'grid' + movie._id}
								>
									<img
										src={movie.poster_url}
										className="movie-poster"
										alt={movie.title}
									/>
									<Grid
										title={movie.title}
										subtitle={
											<span>
												Release Date:{' '}
												{new Date(
													movie.release_date,
												).toDateString()}
											</span>
										}
									/>
								</Grid>
							))}
						</Grid>
					</div>
					<div className="right">
						<Card>
							<CardContent>
								<FormControl
									variant={'formControl'}
									className={classes.formControl}
								>
									<Typography
										variant={'subtitle1'}
										color="textSecondary"
									>
										FIND MOVIES BY:
									</Typography>
								</FormControl>

								<FormControl
									variant={'formControl'}
									className={classes.formControl}
								>
									<InputLabel htmlFor="movieName">
										Movie Name
									</InputLabel>
									<Input
										id="movieName"
										name="movieName"
										onChange={handleChange}
									/>
								</FormControl>

								<FormControl
									variant={'formControl'}
									className={classes.formControl}
								>
									<InputLabel htmlFor="select-multiple-checkbox">
										Genres
									</InputLabel>
									<Select
										multiple
										name={'genres'}
										input={
											<Input id="select-multiple-checkbox-genre" />
										}
										renderValue={(selected) =>
											selected.join(',')
										}
										value={state.genres}
										onChange={handleChange}
									>
										{state.genresList.map((genre) => (
											<MenuItem
												key={genre.genreid}
												value={genre.genre}
											>
												<Checkbox
													checked={
														state.genres.indexOf(
															genre.genre,
														) > -1
													}
												/>
												<ListItemText
													primary={genre.genre}
												/>
											</MenuItem>
										))}
									</Select>
								</FormControl>

								<FormControl
									variant={'formControl'}
									className={classes.formControl}
								>
									<InputLabel htmlFor="select-multiple-checkbox">
										Artists
									</InputLabel>
									<Select
										multiple
										name={'artists'}
										input={
											<Input id="select-multiple-checkbox" />
										}
										renderValue={(selected) =>
											selected.join(',')
										}
										value={state.artists}
										onChange={artistSelectHandler}
									>
										{state.artistsList.map((artist) => (
											<MenuItem
												key={artist.artistid}
												value={
													artist.first_name +
													' ' +
													artist.last_name
												}
											>
												<Checkbox
													checked={
														state.artists.indexOf(
															artist.first_name +
																' ' +
																artist.last_name,
														) > -1
													}
												/>
												<ListItemText
													primary={
														artist.first_name +
														' ' +
														artist.last_name
													}
												/>
											</MenuItem>
										))}
									</Select>
								</FormControl>

								<FormControl
									variant={'formControl'}
									className={classes.formControl}
								>
									<TextField
										id="releaseDateStart"
										name="releaseDateStart"
										label="Release Date Start"
										type="date"
										defaultValue=""
										InputLabelProps={{ shrink: true }}
										onChange={handleChange}
									/>
								</FormControl>

								<FormControl
									variant={'formControl'}
									className={classes.formControl}
								>
									<TextField
										id="releaseDateEnd"
										name={'releaseDateEnd'}
										label="Release Date End"
										type="date"
										defaultValue=""
										InputLabelProps={{ shrink: true }}
										onChange={handleChange}
									/>
								</FormControl>
								<br />
								<br />
								<FormControl
									variant={'formControl'}
									className={classes.formControl}
								>
									<Button
										onClick={() => filterApplyHandler()}
										variant="contained"
										color="primary"
									>
										APPLY
									</Button>
								</FormControl>
							</CardContent>
						</Card>
					</div>
				</div>
			</ThemeProvider>
		</div>
	);
};

export default Home;
