// Frameworks functions
import React, { Fragment } from 'react';
// Frameworks and local styles
import { Container } from 'semantic-ui-react';

import Header from '../components/Header';

export default function LayoutBasic(props) {
	// console.log(props);
	const { children } = props;
	return (
		<Fragment>
			<Header />
			<Container className="layout-basic">{children}</Container>
		</Fragment>
	);
}
