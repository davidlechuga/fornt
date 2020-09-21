// Frameworks functions
import React, { Fragment } from 'react';
import {useMutation} from '@apollo/client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify'
// Frameworks and local styles
import './EmailForm.scss'
import { Form, Button } from 'semantic-ui-react';
// Queries or mutations
import { UPDATE_USER } from '../../../gql/user'



export default function EmailForm(props) {
    const { setShowModal, currentEmail, refetch } = props;
    const [updateUser] = useMutation(UPDATE_USER)

    const formik = useFormik({
        initialValues: {
            email: currentEmail ||  "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
        }),
        onSubmit:  async (formData) => {
            try {
                await updateUser({
                    variables: {
                        input: formData
                    },
                });
                refetch();
                setShowModal(false);
            } catch (error) {
                toast.error("Error al actualizar el email");
            }
        }
    });

    return (
        <Fragment>
            <Form className="email-form" onSubmit={formik.handleSubmit} >
                <Form.Input
                    placeholder="Escribe tu nuevo email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email && true}
                />
                <Button className="btn-submit" type="submit" >Actualizar</Button>
            </Form>
        </Fragment>
    )
}
