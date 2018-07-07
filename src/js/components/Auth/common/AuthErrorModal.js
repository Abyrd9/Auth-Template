import styled from 'styled-components';
import { Color, Font, Shadow, Depth } from '../../../style/Mixins';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ModalContainer = styled.div`
	padding: 20px 10px;
	width: 100%;
	max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
	text-align: center;
  background-color: ${Color.White};
	color: ${Color.Black};
	${props => props.isOpen ? `
	transition: opacity .5s cubic-bezier(0.77, 0, 0.175, 1), transform .5s cubic-bezier(0.77, 0, 0.175, 1);
	` : `
	transition: opacity .5s cubic-bezier(0.77, 0, 0.175, 1), transform .5s cubic-bezier(0.77, 0, 0.175, 1), visibility 0s linear .5s;
	`}
	${Font(500, '14px')}
	${Shadow(2)}
	${Depth('top')}
	visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
	opacity: ${props => props.isOpen ? '1' : '0'};
	transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-25px)'};
`

const ModalBackdrop = styled.div`
  position: absolute;
  top: calc(100% - 80px);
  left: 0;
	width: 100%;
	padding: 0px 15px;
	display: flex;
  justify-content: center;
  align-items: center;
	text-align: center;
	visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
`

class AuthErrorModal extends Component {
  render() {
    return (
			<ModalBackdrop isOpen={this.props.isOpen}>
				<ModalContainer isOpen={this.props.isOpen}>
					{this.props.errorMessage}
				</ModalContainer>
			</ModalBackdrop>
    );
  }
}

AuthErrorModal.propTypes = {
  errorMessage: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
};

export default AuthErrorModal;