// Frameworks functions
import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
// Frameworks and local styles
import { Grid, Image } from 'semantic-ui-react';
import './Profile.scss';
// Queries or mutationes
import { GET_USER } from '../../../gql/user.js';
// Assets
import ImageNoFound from '../../../assets/imagenes/avatar.png';
// Components
import UserNotFound from '../../UserNotFound';
import ModalBasic from '../../Modal/ModalBasic';
import AvatarForm from '../AvatarForm';
import HeaderProfile from './HeaderProfile'
import SettingsForm from '../SettingsForm';
import Followers from './Followers';
//Hooks
import userAuth from '../../../hooks/useAuth';

export default function Profile(props) {
	// console.log(props);
	const { username, totalPublications } = props;
	// por de regla los hooks van en un top level
	const { auth } = userAuth();
	// Modal Dinamico segun click en en un componente
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState(' ');
	const [childenModal, setChildenModal] = useState(null);
	// Encontrar foto de username
	const { data, loading, error, refetch } = useQuery(GET_USER, {
		variables: { username }
	});

	if (loading) return null;
	if (error) return <UserNotFound />;
	const { getUser } = data;


	const handleModal = (type) => {
		switch (type) {
			case 'avatar':
				//crear 3 estados 1-. (titulo de la card) 2-. (guardar el children del modal) 3-. (setear el modal)
				setTitleModal('Cambiar foto de Perfil');
				setChildenModal(<AvatarForm setShowModal={setShowModal} auth={auth} />);
				setShowModal(true);
				break;
			case 'settings':
				setTitleModal("");
				setChildenModal(
					<SettingsForm
						setShowModal={setShowModal}
						setTitleModal={setTitleModal}
						setChildenModal={setChildenModal}
						getUser={getUser}
						refetch={refetch}
					/>
				);
				setShowModal(true);

				break;

			default:
				break;
		}
	};
	// obtenemos le auth sdel usuario para compararlo con el modal del perfil.
	// console.log(auth);
	// console.log(username);
	// console.log(getUser);
	return (
		<Fragment>
			<Grid className="profile">
				<Grid.Column width={5} className="profile__left">
					<Image
						src={getUser.avatar ? getUser.avatar : ImageNoFound}
						avatar
						alt="twitgov-avatar"
						// validamos el auth del usuarioal para abrir el modal del perfil.
						onClick={() => username === auth.username && handleModal('avatar')}
					/>
				</Grid.Column>
				<Grid.Column width={11} className="profile__right">
					<HeaderProfile
						getUser={getUser}
						auth={auth}
						handleModal={handleModal}
					/>

					<Followers username={username} totalPublications={totalPublications} />


					<div className="other">
						<p className="name"> {getUser.name} </p>
						{getUser.siteWeb && (
							// Generamos la condición de que si existe siteWeb lop renderize
							<a href={getUser.siteWeb} className="siteWeb"
								rel="noopener noreferrer" target="_blank">
								{getUser.siteWeb}
							</a>
						)}
						{getUser.description && (
							// Generamos la condición de que si existe siteWeb lop renderize
							<p className="description">{getUser.description}</p>
						)}
					</div>
				</Grid.Column>
			</Grid>
			<ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
				{childenModal}
			</ModalBasic>
		</Fragment>
	);
}
