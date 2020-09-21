// Frameworks functions
import React from 'react';
// Styles css or Frameworks of css
import { Modal, Grid } from 'semantic-ui-react';
import './ModalPublication.scss';
//components
import CommentForm from './CommentForm';
import Comments from './Comments';



export default function ModalPublication(props) {
    const { show, setShow, publication } = props;
    const onClose = () => setShow(false);

    return (
        <Modal open={show} onClose={onClose} className="modal-publication">
            <Grid>
                <Grid.Column
                    className="modal-publication__left"
                    width={16}
                    style={{ backgroundImage: `url("${publication.file}")` }}
                />
                <Grid.Column className="modal-publication__right" width={16}>
                    <Comments publication={publication} />

                    <CommentForm publication={publication} />
                </Grid.Column>
            </Grid>
        </Modal>
    )
}
