// Frameworks functions
import React from 'react'
// Frameworks and local styles
import './RegisterForm.scss'
import {Button, Form} from 'semantic-ui-react'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
// Queries or Mutation 
import {useMutation} from '@apollo/client';
import {REGISTER_USER} from '../../../gql/user'

export default function RegisterForm(props) {
    const { setShowLogin } = props;
    // console.log(props);
    const [register] = useMutation(REGISTER_USER)

    // En esta constante guardamos nuestra estructura de datos 
    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required("Tu nombre es obligatorio"),
            username:Yup.string()
            .matches
             (/^[a-zA-Z0-9-]*$/,
                "El nombre de tu usuario no debe tener espacios"
             )
             .required("El nombre de usuario es obligatorio"),
             email: Yup.string().email("El email no es válido")
             .required("El email es obligatorio"),
             password: Yup.string()
             .required("La contraseña es obligatoria")
             .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales" ),
             repeatPassword: Yup.string()
             .required("La contraseña es obligatoria")
             .oneOf([Yup.ref("password")], "Las contraseñas no son iguales "),
        }),
        onSubmit: async (formData) => {
            // console.log("FORM enviado");
            // console.log(formValue);
            try {
                //guardamos los datos del form para crear un nuevoUsuario eliminando el campo de repeatPassword
                const newUser = formData;
                delete newUser.repeatPassword;
                // console.log(newUser);
                // Guardamos en el input , neustro nuevo usuario
                await register({
                   variables: {
                       input: newUser,
                   },
                });
              
                toast.success("Usuario Registrado Correctamente")
                setShowLogin(true)
            } catch (error) {
                toast.error(error.message)
                console.log(error.message);
            }
        }
    }) 
    
    return ( 
        <>
            <h2 className="register-form-title"> Registrate para ver Fotos y Videos de tus Amigos </h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input 
                    type="text"
                    placeholder="Nombre y Apellidos"
                    name="name"
                    value={formik.values.name}
                    error={formik.errors.name && true}
                    onChange= {formik.handleChange}
                />
                <Form.Input 
                    type="text"
                    placeholder="Nombre de Usuario"
                    name="username"
                    onChange= {formik.handleChange}
                    value={formik.values.username}
                    error={formik.errors.username && true}

                />
                 <Form.Input 
                    type="text"
                    placeholder="Correo Electrónico"
                    name="email"
                    value={formik.values.email}
                    onChange= {formik.handleChange}
                    error={formik.errors.email && true}
                
                />
                <Form.Input 
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formik.values.password}
                    onChange= {formik.handleChange}  
                    error={formik.errors.password && true}
                />
                <Form.Input 
                    type="password"
                    placeholder="Repetir Contraseña"
                    name="repeatPassword"
                    value={formik.values.repeatPassword}
                    onChange= {formik.handleChange}
                    error={formik.errors.repeatPassword && true}
                />

                <Button type="submit" className="btn-submit">
                    Registrarse
                </Button>
                <Button type="button" onClick={formik.handleReset}> Reset </Button>

            </Form>
        </>
    )
}

function initialValues() {
    return {
         name:"",
         username:"",
         email:"",
         password:"",
         repeatPassword:""
    };
}

