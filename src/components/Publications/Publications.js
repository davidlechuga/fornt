// Frameworks functions
import React from 'react';
// Frameworks and local styles
import { Grid } from 'semantic-ui-react'
import { map } from 'lodash'
import './Publications.scss';
//Queries or Mutations
// Components
import PreviewPublication from './PreviewPublication';

export default function Publications(props) {
    const { getPublications } = props;

    return (
        <div className="publications">
            <h1>Publicaciones</h1>
            <Grid columns={4}>
                {map(getPublications, (publication, index) => (
                    <Grid.Column key={index}>
                        <PreviewPublication publication={publication} />
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    );
}