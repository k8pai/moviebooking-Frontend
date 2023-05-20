import React, { Component, createContext, useContext } from 'react';
import Home from '../screens/home/Home';
import Details from '../screens/details/Details';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookShow from '../screens/bookshow/BookShow';
import Confirmation from '../screens/confirmation/Confirmation';
import { backendApiContext } from '../context';

const Controller = () => {
	const { baseUrl } = useContext(backendApiContext);

	return (
		<BrowserRouter>
			<backendApiContext.Provider value={{ baseUrl }}>
				<div className="main-container">
					<Routes>
						<Route exact path="/" element={<Home />} />
						{/* <Route
						exact
						path="/"
						render={(props) => (
							<Home {...props} baseUrl={this.baseUrl} />
						)}
					/> */}
						{/* <Route
							path="/movie/:id"
							render={(props) => (
								<Details {...props} baseUrl={this.baseUrl} />
							)}
						/>
						<Route
							path="/bookshow/:id"
							render={(props) => (
								<BookShow {...props} baseUrl={this.baseUrl} />
							)}
						/>
						<Route
							path="/confirm/:id"
							render={(props) => (
								<Confirmation
									{...props}
									baseUrl={this.baseUrl}
								/>
							)}
						/> */}
					</Routes>
				</div>
			</backendApiContext.Provider>
		</BrowserRouter>
	);
};

export default Controller;
