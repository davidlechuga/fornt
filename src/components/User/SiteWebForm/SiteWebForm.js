// Frameworks functions
import React, { Fragment } from 'react';

// Frameworks and local styles
import './SiteWebForm.scss';
import { Form, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// Queries or mutations
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';

export default function SiteWebForm(props) {
	const { setShowModal, currentSiteWeb, refetch } = props;
	const formik = useFormik({
		initialValues: {
			siteWeb: currentSiteWeb || ''
		},
		validationSchema: Yup.object({
			siteWeb: Yup.string().required()
		}),
		onSubmit: async (formData) => {
			try {
				await updateUser({
					variables: {
						input: formData
					}
				});
				refetch();
				setShowModal(false);
			} catch (error) {
				toast.error('Error al Actualizar tu Sitio Web');
			}
		}
	});

	const [ updateUser ] = useMutation(UPDATE_USER);

	return (
		<Fragment>
			<Form className="site-web-form" onSubmit={formik.handleSubmit}>
				<Form.Input
					placeholder="URL web"
					name="siteWeb"
					value={formik.values.siteWeb}
					onChange={formik.handleChange}
					error={formik.errors.siteWeb && true}
				/>
				<Button className="btn-submit" type="submit">
					Actualizar
				</Button>
			</Form>
		</Fragment>
	);
}
