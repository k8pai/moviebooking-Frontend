import { createContext } from 'react';

const backendApiContext = createContext({
	baseUrl: 'http://localhost:8080/api/',
});

export { backendApiContext };
