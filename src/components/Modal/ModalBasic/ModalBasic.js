// Frameworks functions
import React, { Fragment } from 'react';
// Frameworks and local styles
import { Modal } from 'semantic-ui-react';
import './ModalBasic.scss';

export default function ModalBasic(props) {
	//props que recibe el modal
	const { show, setShow, title, children } = props;
	//Funcion que cierra el modal
	const onClose = () => {
		setShow(false);
	};
	return (
		<Fragment>
			<Modal size="mini" open={show} onClose={onClose} className="modal-basic">
				{title && <Modal.Header> {title} </Modal.Header>}
				{children}
			</Modal>
		</Fragment>
	);
}
