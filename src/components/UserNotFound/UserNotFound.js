// Frameworks functions
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// Frameworks and local styles
import {} from 'semantic-ui-react';
import './UserNotFound.scss';

export default function UserNotFound() {
	return (
		<Fragment>
			<div className="user-not-found">
				<p>Usuario no Encontrado </p>
				<p>Es posible que el enlace sea incorrecto o el usuario se haya eliminado </p>
				<Link to="/"> Volver a la Home </Link>
			</div>
		</Fragment>
	);
}
