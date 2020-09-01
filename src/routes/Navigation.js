// Frameworks functions
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { map } from 'lodash';

// Rutas
import routes from './routes';

export default function Navigation() {
	return (
		<Router>
			<Switch>
				{map(routes, (route, index) => (
					<Route
						key={index}
						path={route.path}
						exact={route.exact}
						render={(props) => (
							<route.layout>
								<route.component {...props} />
							</route.layout>
						)}
					/>
				))}
			</Switch>
		</Router>
	);
}
