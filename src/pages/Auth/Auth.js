// Frameworks functions
import React, { useState } from 'react';
// Frameworks and local styles
import { Container, Image } from 'semantic-ui-react'
import './Auth.scss';
// Assets
import twitgov from '../../assets/logos/twitgov.png'
// Components
import RegisterForm from '../../components/Auth/RegisterForm'
import LoginForm  from '../../components/Auth/LoginForm';


export default function Auth() {
    const [showLogin, setShowLogin] = useState(false)
    return (
        <Container fluid className="auth">
            <Image src={twitgov} /> 

            <div className="container-form">
                {
                showLogin ? 
                
                <LoginForm
                
                />

                :

                <RegisterForm 
                    setShowLogin={setShowLogin}
                />  
                }
            </div>

            <div className="change-form">
                <p>
                {
                showLogin ? 
                     (
                        <>
                            ¿ No tienes cuenta ?
                            <span onClick= {() => setShowLogin(!showLogin)} > Regístrate </span>

                        </>
                    )

                    : 
                    
                    (
                        <>
                            ¡ Entrar con tu cuenta !
                            <span onClick= {() => setShowLogin(!showLogin)} > Iniciar Sesion </span>
                        </>
                    )
                }
                </p>
            </div>
        </Container> 
    )
}
