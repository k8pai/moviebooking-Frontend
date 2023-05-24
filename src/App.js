import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { backendApiContext } from './context';
// import Details from './details/Details';
// import BookShow from '../../experimenting/bookshow/BookShow';
// import Confirmation from './confirmation/Confirmation';

const App = () => {
	const baseURL = 'http://localhost:8080/api/';

	return (
		<BrowserRouter>
			<backendApiContext.Provider value={{ baseUrl: baseURL }}>
				<div className="main-container">
					<Routes>
						<Route exact path="/" element={<Home />} />
						{/* <Route path="/movie/:id" element={<Details />} />
						<Route path="/bookshow/:id" element={<BookShow />} />
						<Route path="/confirm/:id" element={<Confirmation />} /> */}
					</Routes>
				</div>
			</backendApiContext.Provider>
		</BrowserRouter>
	);
};

export default App;
