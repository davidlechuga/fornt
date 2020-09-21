// Frameworks functions
import React, { Fragment, useState } from 'react';
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
//components
import ModalUpload from '../../Modal/ModalUpload';


export default function RightHeader() {

	const [showModal, setShowModal] = useState(false)
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
				<Icon onClick={() => setShowModal(true)} name="plus" />
				<Link to={`/${auth.username}`}>
					<Image src={getUser.avatar ? getUser.avatar : ImageNoFound}
						avatar alt="avatar twitgov" />
				</Link>
			</div>

			<ModalUpload show={showModal} setShow={setShowModal} />
		</Fragment>
	);
}
