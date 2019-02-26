import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import { loginUser,getProfileCreted } from '../../actions/authActions';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';


class Forgot extends Component{

	constructor(){
		super();
		this.state = {
			newpassword: '',
			oldpassword: '',
			newpassword2: '',
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
	}

  onChange(e){
  	this.setState({ [e.target.name]: e.target.value});
  }

  render() {
  	const { errors } = this.state;

  	return (
  		<div className="forgot">
  			<div className="container">
  				<div className="row">
  					<div className="col-md m-auto">
            <Link to={`/dashboard`} className="btn btn-light">
                Go Back
            </Link>
  						<h1 className="display-4 text-center">Password Reset</h1>
  						<p className="lead text-center">
  						Change your Password
  						</p>
  						<form noValidate onSubmit={this.onSubmit}>
  						<TextFieldGroup
  							placeholder="Old Password"
  							name="oldpassword"
  							type="password"
  							value={this.state.password}
  							onChange={this.onChange}
  							error= {errors.name}
  						/>
  						<TextFieldGroup
                placeholder="New Password"
                name="newpassword"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
              <TextFieldGroup
                placeholder="Confirm New Password"
                name="newpassword2"
                type="password"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}	
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>	
          </div>  	
        </div>    
      </div>    
  	);
}
}

Forgot.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.func.isRequired,
	errors: PropTypes.func.isRequired,
};

export default Forgot;
