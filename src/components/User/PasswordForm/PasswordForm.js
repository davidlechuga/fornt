// Frameworks functions
import React, { Fragment } from 'react'
import { useMutation } from '@apollo/client';
// Frameworks and local styles
import { Form, Button, Input } from 'semantic-ui-react';
import './PasswordForm.scss';
import { toast  }  from 'react-toastify'
// Forms Frameworks
import { useFormik} from 'formik'
import * as Yup from 'yup'
// Queryes or Mutations
import { UPDATE_USER } from '../../../gql/user'
// Hoooks



export default function PasswordForm(props) {
    const [updateUser] = useMutation(UPDATE_USER)
    const {logout} = props;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword: Yup.string().required().oneOf([Yup.ref("repeatNewPassword")]),
            repeatNewPassword: Yup.string().required().oneOf([Yup.ref("newPassword")])
        }),
        onSubmit: async (formValues) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            currentPassword: formValues.currentPassword,
                            newPassword: formValues.newPassword
                        }
                    }
                });
                if (!result.data.updateUser) {
                    toast.error("Error al Cambiar la Contraseña");
                } else {
                    logout();
                }
            } catch (error) {
                toast.error("Error al Cambiar la Contraseña");
            }
        }
    });

    return (
        <Fragment>
            <Form className="password-form" onSubmit={formik.handleSubmit}>
                <Form.Input
                    placeholder="Contraseña Actual"
                    name="currentPassword"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    error= {formik.errors.currentPassword && true}

                />
                <Form.Input
                    type="password"
                    placeholder="Nueva Constraseña"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.newPassword && true}
                />
                <Form.Input
                    type="password"
                    placeholder="Repetir Nueva Constraseña"
                    name="repeatNewPassword"
                    value={formik.values.repeatNewPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.repeatNewPassword && true}
                />

                <Button
                    className="btn-submit"
                    type="submit"
                > Actualizar </Button>
            </Form>
        </Fragment>
    )
}

function initialValues() {
    return {
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
    }
}
