// Frameworks functions
import React, { Fragment } from 'react';
// Frameworks and local styles
import { Button } from 'semantic-ui-react';
import './HeaderProfile.scss';

//Queries or Mutatiions
import { useQuery, useMutation } from '@apollo/client';
import { IS_FOLLOW, FOLLOW, UN_FOLLOW } from '../../../../gql/follow'

export default function HeaderProfile(props) {
    const { getUser, auth, handleModal } = props;
    const [follow] = useMutation(FOLLOW);
    const [unFollow] = useMutation(UN_FOLLOW)

    const { data, loading, refetch } = useQuery(IS_FOLLOW, {
        variables: { username: getUser.username },
    });

    const buttonFollow = () => {
        if (data.isFollow) {
            return (
                <Button onClick={onUnFollow} className="btn-danger">
                    Dejar de Seguir
                </Button>
            )
        } else {
            return (
                <Button onClick={onFollow} className="btn-action">
                    Seguir
                </Button>
            )
        }
    }

    const onFollow = async () => {
        try {
            await follow({
                variables: {
                    username: getUser.username,
                }
            });
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    const onUnFollow = async () => {
        try {
            await unFollow({
                variables: {
                    username: getUser.username,
                },
            });
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <div className="header-profile">
                <h2> {getUser.username} </h2>

                {getUser.username === auth.username ? (
                    <Button onClick={() => handleModal("settings")}>
                        Ajustes
                    </Button>
                ) : (
                        !loading && buttonFollow()

                    )}

            </div>

        </Fragment>
    )
}
