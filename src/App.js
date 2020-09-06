// Frameworks functions
import React, { useState, useEffect, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
// Frameworks styles
import { ToastContainer } from 'react-toastify';
// Conexión between server and client
import client from './config/apollo';
// Auth
import Auth from './pages/Auth';
// Pages

//Context
import AuthContext from './context/AuthContext';
//Utils
import { getToken, decodeToken, removeToken } from './utils/token';

// Components

// Routes
import Navigation from './routes/Navigation';

function App() {
	// si tiene token estara logeado
	const [ auth, setAuth ] = useState(undefined);

	useEffect(() => {
		const token = getToken();
		if (!token) {
			setAuth(null);
		} else {
			setAuth(decodeToken(token));
		}
		console.log(token);
	}, []);

	const logout = () => {
		removeToken();
		setAuth(null);

	};

	const setUser = (user) => {
		setAuth(user);
	};

	const authData = useMemo(
		() => ({
			auth,
			logout,
			setUser
		}),
		[ auth ]
	);
	// solucionarel Flash )aparece login cuando recargamos pagina)
	if (auth === undefined) return null;

	return (
		<ApolloProvider client={client}>
			<AuthContext.Provider value={authData}>
				{!auth ? <Auth /> : <Navigation />}
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</AuthContext.Provider>
		</ApolloProvider>
	);
}

export default App;
