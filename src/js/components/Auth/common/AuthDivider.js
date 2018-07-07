import styled from 'styled-components';
import React from 'react';
import { Font, Color } from '../../../style/Mixins';

const Span = styled.span`
    content: "";
    width: 100px;
    height: 1.5px;
    background-color: ${Color.Gray};
    margin: 0px 10px;
`

const Text = styled.p`
    ${Font(700, '18px')}
		color: ${Color.BlackLight};
`

const Container = styled.div`
    margin: 10px 0px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 320px) {
		display: none;
	}
`

const AuthDivider = (props) => {
	return (
		<Container>
			<Span /><Text>{props.children}</Text><Span />
		</Container>
	);
}

export default AuthDivider;