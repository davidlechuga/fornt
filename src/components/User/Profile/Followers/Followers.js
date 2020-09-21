// Frameworks functions
import React, { Fragment, useEffect, useState } from 'react';

// Frameworks and local styles
import './Followers.scss'
import { size } from 'lodash'
//Queries or Mutations
import { useQuery } from '@apollo/client'
import { GET_FOLLOWERS, GET_FOLLOWEDS } from '../../../../gql/follow'
// Components
import ModalBasic from '../../../Modal/ModalBasic';
import ListUsers from '../../ListUsers';


export default function Followers(props) {

    const { username, totalPublications } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);

    const {
        data: dataFollowers,
        loading: loadingFollowers,
        startPolling: startPollingFollowers,
        stopPolling: stopPollingfollowers }
        = useQuery(GET_FOLLOWERS, {
            variables: { username },
        });

    const {
        data: dataFolloweds,
        loading: loadingFollweds,
        startPolling: startPollingFolloweds,
        stopPolling: stopPollingFolloweds
    }
        = useQuery(GET_FOLLOWEDS, {
            variables: { username }
        })
    // el problerma de implementar el startPolling como realtime somn el numero de poeticiones al servidor.
    useEffect(() => {
        startPollingFollowers(1000);
        return () => {
            stopPollingfollowers();
        }
    }, [startPollingFollowers, stopPollingfollowers]);

    useEffect(() => {
        startPollingFolloweds(1000);
        return () => {
            stopPollingFolloweds();
        }
    }, [startPollingFolloweds, stopPollingFolloweds])

    const openFollowers = () => {
        setTitleModal("Seguidores");
        setChildrenModal(<ListUsers users={getFollowers} setShowModal={setShowModal} />);
        setShowModal(true);
    }

    const openFolloweds = () => {
        setTitleModal("Usiarios Seguidos");
        setChildrenModal(
            <ListUsers users={getFolloweds} setShowModal={setShowModal} />
        );
        setShowModal(true);
    }


    if (loadingFollowers || loadingFollweds) return null;
    const { getFollowers } = dataFollowers;
    const { getFolloweds } = dataFolloweds;
    return (
        <Fragment>
            <div className="followers">
                <p> <span> {totalPublications} </span> publicaciones</p>
                <p onClick={openFollowers} className="link" > <span > {size(getFollowers)}  </span> Seguidores</p>
                <p onClick={openFolloweds} className="link" > <span> {size(getFolloweds)} </span> Seguidos</p>
            </div>

            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
                <h2>{childrenModal} </h2>

            </ModalBasic>

        </Fragment>
    )
}
