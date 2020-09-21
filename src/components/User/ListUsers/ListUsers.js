// Frameworks functions
import React from 'react';
import { useHistory } from 'react-router-dom'
// Frameworks and local styles
import './ListUsers.scss';
import { Image } from 'semantic-ui-react'
import ImageNoFound from '../../../assets/imagenes/avatar.png'
import { size, map } from 'lodash';

export default function ListUsers(props) {
    const { users, setShowModal } = props;
    const history = useHistory();

    const goToUser = (username) => {
        setShowModal(false);
        history.push(`/${username}`);
    }

    console.log(props);
    return (
        <div>
            {size(users) === 0 ? (
                <p className="list-users__not-users">
                    No se han encontrado usuarios.
                </p>
            ) : (
                    map(users, (user, index) => (
                        <div key={index} className="list-users__user" onClick={() => goToUser(user.username)} >
                            <Image src={user.avatar || ImageNoFound} avatar />
                            <div>
                                <p>
                                    {user.name}
                                </p>
                                <p>
                                    {user.username}
                                </p>
                            </div>
                        </div>
                    ))
                )}
        </div>
    );
}
