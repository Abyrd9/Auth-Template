import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Font, Color, Animation } from '../../../style/Mixins';

const AuthInputContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 5px 8px;
	border-bottom: solid 1px ${Color.Gray};
	margin: 10px 0px;
`;

const IconComponent = props => {
	return (
		<i className={`${props.iconClassname} ${props.className}`}></i>
	)
}

const IconStyled = styled(IconComponent)`
	color: ${Color.Gray};
	margin-right: 10px;
	font-size: 14px;
`

const Icon = (props) => {
	return (
		<IconStyled {...props} />
	)
}

const Input = styled.input`
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: transparent;
		border: none;
		outline: none;
		${Font(400, '16px')}
		padding-bottom: 2px;
		color: ${Color.BlackLight};
`;

const Label = styled.label`
	flex: auto;
	position: relative;
	min-height: 20px;
`

const Placeholder = styled.p`
	padding-top: 1px;
	${Font(400, '14px')}
	color: ${Color.BlackLight};
	transform: ${props => props.isActive ? 'translateY(-20px) scale(.8)' : 'translateY(0) scale(1)'};
	opacity: ${props => props.hasText ? '0' : '1'};
	transform-origin: left;
	${Animation('all', '.15s', 'ease-out')}
`

class AuthInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false,
		}
	}
	render() {
		let iconClass;
		switch(this.props.icon) {
			case "name":
				iconClass = "fas fa-user";
				break;
			case "email":
				iconClass = "fas fa-envelope";
				break;
			case "password":
				iconClass = "fas fa-unlock";
				break;
			case "confirm":
				iconClass = "fas fa-lock";
				break;
			default:
				iconClass = "";
		}
		return (
			<AuthInputContainer>
				<Icon iconClassname={iconClass} />
				<Label>
					<Input
						onFocus={() => this.setState({ isActive: true })}
						onBlur={() => this.setState({ isActive: false })}
						type="text"
						value={this.props.value}
						onChange={this.props.onChange}
						disabled={this.props.disabled}
					/>
					<Placeholder
						isActive={this.state.isActive}
						hasText={this.props.value.length > 0}
						onChange={this.props.onChange}
					>
						{this.props.placeholder}
					</Placeholder>
				</Label>
			</AuthInputContainer>
		);
	}
}

AuthInput.propTypes = {
	icon: PropTypes.string,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
};

export default AuthInput;