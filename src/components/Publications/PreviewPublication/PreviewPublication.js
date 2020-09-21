// Frameworks functions
import React, { Fragment, useState } from 'react'
// Frameworks and local styles
import './PreviewPublication.scss';
import { Image } from 'semantic-ui-react'
// Component
import ModalPublication from '../../Modal/ModalPublication';

export default function PreviewPublication(props) {
    const { publication } = props;
    const [showModal, setShowModal] = useState(false)

    return (
        <Fragment>
            <div className="preview-publication" onClick={() => setShowModal(true)}>
                <Image className="preview-publication__image" src={publication.file} />
            </div>

            <ModalPublication
                show={showModal}
                setShow={setShowModal}
                publication={publication}
            />
        </Fragment>
    )
}
