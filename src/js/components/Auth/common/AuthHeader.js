import styled from 'styled-components';
import { Font, Color } from '../../../style/Mixins';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Title = styled.h1`
	text-align: center;
	width: 100%;
	${Font(700, '60px')}
	color: ${Color.Black};
	&:after {
		content: '.';
		${Font(700, '60px')}
		color: ${Color.Red};
	}
	@media (max-width: 320px) {
		${Font(700, '40px')}
		&:after {
			${Font(700, '40px')}
		}
	}
`

const AuthHeaderContainer = styled.div`
	width: 100%;
	max-height: 140px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`

const Image = styled.img`
	height: 40px;
	margin-bottom: 20px;
	@media (max-width: 320px) {
		height: 30px;
		margin-bottom: 5px;
	}
`

class AuthHeader extends Component {
	render() {
		return (
			<AuthHeaderContainer>
				<Image src={this.props.img} />
				<Title>{this.props.title}</Title>
			</AuthHeaderContainer>
		);
	}
}

AuthHeader.propTypes = {
	img: PropTypes.string,
	title: PropTypes.string,
};

export default AuthHeader;