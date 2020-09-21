// Frameworks functions
import React, { Fragment } from 'react';
// Frameworks and local styles
import './DescriptionForm.scss';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// Queries or mutations
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';

export default function DescriptionForm(props) {
	const { setShowModal, currentDescription, refetch } = props;
	const [ updateUser ] = useMutation(UPDATE_USER);

	const formik = useFormik({
		initialValues: {
			description: currentDescription || ''
		},
		validationSchema: Yup.object({
			description: Yup.string().required()
		}),
		onSubmit: async (formData) => {
			// console.log(formData);
			try {
				await updateUser({
					variables: {
						input: formData
					}
				});
				refetch();
				setShowModal(false);
			} catch (error) {
				toast.error('Error al actualizar tu biografía');
			}
		}
	});

	return (
		<Fragment>
			<Form className="description-form" onSubmit={formik.handleSubmit}>
				<TextArea
					name="description"
					value={formik.values.description}
					onChange={formik.handleChange}
					className={formik.errors.description && 'error'}
				/>
				<Button className="btn-submit" type="submit">
					Actualizar
				</Button>
			</Form>
		</Fragment>
	);
}
