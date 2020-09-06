// Frameworks functions
import React, { Fragment } from 'react';
// Frameworks and local styles
import { Button} from 'semantic-ui-react';
import './HeaderProfile.scss';

export default function HeaderProfile(props) {
    const { getUser, auth, handleModal } = props;



    return (
        <Fragment>
            <div className="header-profile">
                <h2> {getUser.username} </h2>

                {getUser.username === auth.username ? (
                    <Button onClick={() => handleModal("settings")}>
                        Ajustes
                    </Button>  
                ) : (
                    <Button>
                        Seguir
                    </Button>     
                ) } 
                
            </div>
                
        </Fragment>
       )
}
