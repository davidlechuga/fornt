// Frameworks functions
import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import {useApolloClient} from '@apollo/client'
// Frameworks and local styles
import './SettingsForm.scss'
import { Button } from 'semantic-ui-react';
//Hooks
import useAuth from '../../../hooks/useAuth';
// Components
import PasswordForm from '../PasswordForm';

export default function SettingsForm(props) {
    const { setShowModal, setTitleModal, setChildenModal } = props;
    const { logout } = useAuth();
    const history = useHistory();
    const client = useApolloClient();
    // actualizar modal 
    const onChangePassword = () => {
        setTitleModal("Cambiar tu Contraseña");
        setChildenModal(
            <div>
                <h2>
                    <PasswordForm logout={onLogout} />
                </h2>
            </div>
        );
    }

    const onLogout = () => {
        client.clearStore();
        logout();
        history.push("/");
    }
    
    return (
        <Fragment>
            <div className="settings-form">
                <Button onClick={onChangePassword}> Cambiar contraseña</Button>
                <Button> Cambiar email</Button>
                <Button> Cambiar descripción</Button>
                <Button> Cambiar sitio Web</Button>
                <Button onClick= {() => onLogout()}> Cerrar Sesión</Button>
                <Button onClick= { () => setShowModal(false)}> Cancelar</Button>
            </div>
        </Fragment>
    )
}
