// Frameworks functions
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
// Frameworks and local styles
import './SettingsForm.scss';
import { Button } from 'semantic-ui-react';
//Hooks
import useAuth from '../../../hooks/useAuth';
// Components
import PasswordForm from '../PasswordForm';
import EmailForm from '../EmailForm';
import DescriptionForm from '../DescriptionForm';
import SiteWebForm from '../SiteWebForm';

export default function SettingsForm(props) {
	const { setShowModal, setTitleModal, setChildenModal, getUser, refetch } = props;
	const { logout } = useAuth();
	const history = useHistory();
	const client = useApolloClient();
	// actualizar modal
	const onChangePassword = () => {
		setTitleModal('Cambiar tu Contraseña');
		setChildenModal(
			<div>
				<h2>
					<PasswordForm logout={onLogout} />
				</h2>
			</div>
		);
	};

	const onChangeEmail = () => {
		setTitleModal('Cambiar Email');
		setChildenModal(<EmailForm setShowModal={setShowModal} currentEmail={getUser.email} refetch={refetch} />);
	};

	const onChangeDescription = () => {
		setTitleModal('Actualizar tu Biografía');
		setChildenModal(
			<DescriptionForm setShowModal={setShowModal} currentDescription={getUser.description} refetch={refetch} />
		);
	};

	const onChangeSiteWeb = () => {
		setTitleModal('Actualizar Sitio Web');
		setChildenModal(<SiteWebForm setShowModal={setShowModal} currentSiteWeb={getUser.siteWeb} refetch={refetch} />);
	};

	const onLogout = () => {
		client.clearStore();
		logout();
		history.push('/');
	};

	return (
		<Fragment>
			<div className="settings-form">
				<Button onClick={onChangePassword}> Cambiar contraseña</Button>
				<Button onClick={onChangeEmail}> Cambiar Email </Button>
				<Button onClick={onChangeDescription}> Cambiar Descripción </Button>
				<Button onClick={onChangeSiteWeb}> Cambiar Sitio Web</Button>
				<Button onClick={() => onLogout()}> Cerrar Sesión</Button>
				<Button onClick={() => setShowModal(false)}> Cancelar</Button>
			</div>
		</Fragment>
	);
}
