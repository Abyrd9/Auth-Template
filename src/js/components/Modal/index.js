import styled from 'styled-components';
import { Color } from '../Mixins';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .3);
  ${props => props.isOpen ? '' : 'display: none;'}
`

const ModalContent = styled.div`
	background-color: ${Color.White};
 	width: 100%;
  margin: 20px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  position: relative;
  background-color: ${Color.White};
`

const IconComponent = props => {
	return (
		<i className={`fas fa-times ${props.className}`} onClick={props.onClick}></i>
	)
}

const IconStyled = styled(IconComponent)`
	color: ${Color.White};
	font-size: 36px;
  position: absolute;
  top: calc(0px - 36px);
  left: calc(100% - 25px);
`

const Icon = (props) => {
	return (
		<IconStyled {...props} />
	)
}


class PopupModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    this.setState({ isOpen: this.props.isOpen })
  }

  componentDidUpdate(prevProps) {
    const isDifferent = prevProps.isOpen !== this.props.isOpen && this.props.isOpen !== this.state.isOpen;
    if (isDifferent) {
      this.setState({ isOpen: this.props.isOpen })
    }
  }

  render() {
    return (
      <ModalContainer isOpen={this.state.isOpen} onClick={() => this.setState({ isOpen: false })}>
          {this.props.children}
      </ModalContainer>
    );
  }
}

PopupModal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
};

export default PopupModal;