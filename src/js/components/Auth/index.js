import React, { Component } from 'react';
import PropTypes from 'prop-types';

import produce from 'immer';
import firebase from '../../utils/Firebase';
import { AuthContainer } from './common/AuthContainer';
import AuthHeader from './common/AuthHeader';
import AuthInput from './common/AuthInput';
import AuthButton from './common/AuthButton';
import AuthPasswordReset from './common/AuthPasswordReset';
import AuthDivider from './common/AuthDivider';
import AuthSocialButton from './common/AuthSocialButtons';
import AuthToggleLink from './common/AuthToggleLink';
import AuthErrorModal from './common/AuthErrorModal';

class Auth extends Component {
	constructor() {
		super();
		this.state = {
			signIn: {
				email: '',
				password: ''
			},
			signUp: {
				name: '',
				email: '',
				password: '',
				confirmPassword: '',
				passwordMatch: false,
			},
			modal: {
				isVisible: false,
				errorMessage: 'There has been an error!',
			},
			emailResetModal: {
				isVisible: false,
			},
			currentPage: 'signUp'
		}
	}

	emailAuth = (email, password, name) => {
    this.props.setIsRunningAuth();
    if (this.state.currentPage === 'signUp') {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(response => {
					console.log(response);
					const userId = response.user.uid;
					console.log(userId);
					firebase.database().ref(`users/${userId}`).update({
						name,
						email
					}, error => console.log(error))
          this.props.setIsRunningAuth();
          this.props.setIsUserActive();
        })
        .catch(error => {
					this.errorModal(error.message);
					console.log(error.code, error.message);
        })
    } else if (this.state.currentPage === 'signIn') {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
          this.props.setIsRunningAuth();
          this.props.setIsUserActive();
        })
        .catch(error => {
					this.errorModal(error.message);
					console.log(error.code, error.message);
        })
    }
	}
	
	googleAuth = () => {
		firebase.auth().signInWithPopup(googleProvider).then(result => {
			const token = result.credential.accessToken;
			const user = result.user;
			firebase.database().ref(`users/${user.uid}`).update({
				name: user.displayName,
				email: user.email
			}, error => console.log(error))
		}).catch(error => {
			this.errorModal(error.message);
			console.log(error.code, error.message, error.email, error.credential);
		})
	}

	facebookAuth = () => {
		firebase.auth().signInWithPopup(facebookProvider).then(result => {
			console.log(result)
			const token = result.credential.accessToken;
			const user = result.user;
			console.log(token, user)
		}).catch(error => {
			this.errorModal(error.message);
			console.log(error.code, error.message, error.email, error.credential);
		})
	}

	errorModal = (error) => {
		this.setState(produce(draft => {
			draft.modal.errorMessage = error;
			draft.modal.isVisible = true;
		}))
		setTimeout(() => {
			this.setState(produce(draft => {
				draft.modal.isVisible = false;
			}))
		}, 5000)
	}

	render() {
		return (
			<AuthContainer>
				<AuthErrorModal
					isOpen={this.state.modal.isVisible}
					errorMessage={this.state.modal.errorMessage}
				/>
				<AuthHeader img="" title="Reset" />

				{this.state.currentPage === 'signIn' && (
					<React.Fragment>
						<AuthInput
							icon="email"
							value={this.state.signIn.email}
							onChange={e => this.setState(
								produce(draft => { draft.signIn.email = e.target.value })
							)}
							placeholder="Email"
						/>
						<AuthInput
							icon="password"
							value={this.state.signIn.password}
							onChange={e => this.setState(
								produce(draft => { draft.signIn.password = e.target.value })
							)}
							placeholder="Password"
						/>
						<AuthButton
							// onClick={() => this.emailAuth(this.state.signIn.email, this.state.signIn.password)}
							onClick={() => this.errorModal()}
						>
							Sign In
						</AuthButton>
						<AuthPasswordReset>I forgot my password.</AuthPasswordReset>
						<AuthDivider>or</AuthDivider>
						<AuthSocialButton
							icon="facebook"
							onClick={() => this.facebookAuth()}
						/>
						<AuthSocialButton
							icon="google"
							onClick={() => this.googleAuth()}
						/>
						<AuthToggleLink
							linkText="Sign Up"
							text="Don't have an account? "
							onClick={() => this.setState(
								produce(draft => { draft.currentPage = 'signUp'})
							)}
						/>
					</React.Fragment>
				)}

				{this.state.currentPage === 'signUp' && (
					<React.Fragment>
						<AuthInput
							icon="name"
							value={this.state.signUp.name}
							onChange={e => this.setState(
								produce(draft => { draft.signUp.name = e.target.value })
							)}
							placeholder="Name"
						/>
						<AuthInput
							icon="email"
							value={this.state.signUp.email}
							onChange={e => this.setState(
								produce(draft => { draft.signUp.email = e.target.value })
							)}
							placeholder="Email"
						/>
						<AuthInput
							icon="password"
							value={this.state.signUp.password}
							onChange={e => this.setState(
								produce(draft => { draft.signUp.password = e.target.value })
							)}
							placeholder="Password"
						/>
						<AuthInput
							icon="confirm"
							value={this.state.signUp.confirmPassword}
							onChange={e => this.setState(
								produce(draft => { draft.signUp.confirmPassword = e.target.value })
							)}
							placeholder="Confirm Password"
						/>
						<AuthButton
							onClick={() => this.emailAuth(this.state.signUp.email, this.state.signUp.password, this.state.signUp.name)}
						>
							Sign Up
						</AuthButton>
						<AuthDivider>or</AuthDivider>
						<AuthSocialButton
							icon="facebook"
							onClick={() => this.facebookAuth()}
						/>
						<AuthSocialButton
							icon="google"
							onClick={() => this.googleAuth()}
						/>
						<AuthToggleLink
							linkText="Sign In"
							text="Already have an account? "
							onClick={() => this.setState(
								produce(draft => { draft.currentPage = 'signIn'})
							)}
						/>
					</React.Fragment>
				)}
			</AuthContainer>
		);
	}
}

Auth.propTypes = {

};

export default Auth;