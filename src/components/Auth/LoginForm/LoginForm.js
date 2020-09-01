// Frameworks functions
import React, { useState } from 'react';
// Frameworks and local styles
import { Button, Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './LoginForm.scss';
// Utils Token Auth
import { setToken, decodeToken } from '../../../utils/token';

// Queries or Mutation
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../../gql/user';

//Hooks
import useAuth from '../../../hooks/useAuth';

export default function LoginForm() {
	// const auth = useAuth();
	const { setUser } = useAuth();
	// console.log(auth);
	// manejar errores del login segun condiciones server en userController
	const [ error, setError ] = useState('');
	//usando el mutation de login
	const [ login ] = useMutation(LOGIN_USER);
	// usando hook de formik
	const formik = useFormik({
		initialValues: initialValues(),
		validationSchema: Yup.object({
			email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
			password: Yup.string().required('La contraseña es obligatoria')
		}),
		// metodo onsubmit que recibe datos y ejecuta el try-catch
		onSubmit: async (formData) => {
			// console.log(formData);
			//limpiando error de contraseña o correo incorrecto
			setError('');
			try {
				// const result = await login
				const { data } = await login({
					variables: {
						input: formData
					}
				});
				const { token } = data.login;
				// console.log(data);
				// console.log(token);
				setToken(token);
				setUser(decodeToken(token));
			} catch (error) {
				setError(error.message);
				console.log(error);
			}
		}
	});
	return (
		<div>
			<Form className="login-form" onSubmit={formik.handleSubmit}>
				<h2> Entra para ver Fotos y Videos de tus Amigos. </h2>
				<Form.Input
					type="text"
					placeholder="Correo electrónico"
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email}
					error={formik.errors.email && true}
				/>
				<Form.Input
					type="password"
					placeholder="Contraseña"
					name="password"
					onChange={formik.handleChange}
					value={formik.values.password}
					error={formik.errors.password && true}
				/>
				<Button type="submit" className="btn-submit">
					iniciar sesión
				</Button>
				{error && <p className="submit-error"> {error} </p>}
			</Form>
		</div>
	);
}

function initialValues() {
	return {
		email: '',
		password: ''
	};
}
