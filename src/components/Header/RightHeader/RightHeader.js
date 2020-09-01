// Frameworks functions
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// Queries or mutationes
import { GET_USER } from '../../../gql/user.js';
// Frameworks and local styles
import { Icon, Image } from 'semantic-ui-react';
import './RightHeader.scss';
//Hooks
import useAuth from '../../../hooks/useAuth';
//Assets
import ImageNoFound from '../../../assets/imagenes/avatar.png';


export default function RightHeader() {
	// const data = useAuth();
	const { auth } = useAuth();
	// console.log(data);
	const { data, loading, error } = useQuery(GET_USER, {
		variables: { username: auth.username }
	});

	if (loading || error) return null;
	const { getUser } = data;	

	return (
		<Fragment>
			<div className="right-header">
				<Link to="/">
					<Icon name="home" />
				</Link>
				<Icon name="plus" />
				<Link to={`/${auth.username}`}>
					<Image src={ getUser.avatar ? getUser.avatar : ImageNoFound}
						avatar alt="avatar twitgov" />
				</Link>
			</div>
		</Fragment>
	);
}
