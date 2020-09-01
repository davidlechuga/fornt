// Frameworks functions
import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

// Components
import Profile from '../components/User/Profile';

export default function User() {
	// const params = useParams();
	// console.log(params);
	const { username } = useParams();

	return (
		<Fragment>
			<Profile username={username} />
		</Fragment>
	);
}
