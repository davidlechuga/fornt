// Frameworks functions
import React, { Fragment, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@apollo/client'
// Frameworks and local styles
import { Button } from 'semantic-ui-react';
import { toast } from 'react-toastify'
import './AvatarForm.scss';
// Queryes or Mutation
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from '../../../gql/user'

export default function AvatarForm(props) {
    // console.log(props);
    const { setShowModal, auth } = props;
    const [loading, setLoading] = useState(false)

    const [updateAvatar] = useMutation(UPDATE_AVATAR, {
        update(cache, { data: { updateAvatar } }) {
            // console.log(updateAvatar);
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: { username: auth.username },
            });
            cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username },
                data: { getUser: { ...getUser, avatar: updateAvatar.urlAvatar } },
            });
        },
    });

    const [deleteAvatar] = useMutation(DELETE_AVATAR, {
        update(cache) {
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: { username: auth.username }
            });
            cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username },
                data: {
                    getUser: { ...getUser, avatar: "" },
                }
            })
        }
    });

    const onDrop = useCallback(async (acceptedFile) => {
        // console.log(acceptedFile);
        const file = acceptedFile[0];
        try {
            setLoading(true)
            // console.log(file); 
            // enviar el path al servidor
            const result = await updateAvatar({ variables: { file } });
            // console.log(result);
            const { data } = result;

            if (!data.updateAvatar.status) {
                toast.warning("Error al actualizar el avatar");
                setLoading(false)
            } else {
                setLoading(false);
                setShowModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);
    //useDropZone nos devuleve propiedades por eso el destructuring
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop,
    })

    const onDeleteAvatar = async () => {
        try {
            const result = await deleteAvatar();
            const { data } = result;

            if (!data.deleteAvatar) {
                toast.warning("Error al borrar el Avatar");

            } else {
                setShowModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Fragment>
            <div className="avatar-form">
                <Button {...getRootProps()}
                    loading={loading}
                >
                    Cargar una foto
                </Button>
                <Button onClick={onDeleteAvatar}> Eliminar foto actual</Button>
                <Button onClick={() => setShowModal(false)}> Cancelar</Button>
                <input {...getInputProps()} />
            </div>
        </Fragment>
    );
}
