// Frameworks functions
import React from 'react';
import { Link } from 'react-router-dom';
// Frameworks and local styles
import { Container, Grid, Image } from 'semantic-ui-react';
import './Header.scss';
//Assets
import Logo from '../../assets/logos/twitgov.png';

//Components
import RightHeader from './RightHeader';
import Search from './Search';

export default function Header() {
	return (
		<div className="header">
			<Container>
				<Grid>
					<Grid.Column width={3} className="header_logo">
						<Link to="/">
							<Image src={Logo} alt="Twitgov" />
						</Link>
					</Grid.Column>
					<Grid.Column width={10}>
						<Search />
					</Grid.Column>
					<Grid.Column width={3}>
						<RightHeader />
					</Grid.Column>
				</Grid>
			</Container>
		</div>
	);
}
