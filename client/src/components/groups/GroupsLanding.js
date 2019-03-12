import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    let landingContent;

    landingContent = (
        <div>
            <div className="btn-group-vertical d-flex flex-wrap justify-content-center align-items-center " role="group">
                <Link to="/create-group" className="btn btn-light">
                <i className="fas fa-user-circle text-dark mr-1" /> Create A Group
                </Link>
                <br></br>
                <Link to="#" className="btn btn-light">
                <i className="fas fa-user-circle text-dark mr-1" /> Search Groups
                </Link>
                <br></br>
                <Link to="/groups" className="btn btn-light">
                <i className="fas fa-exclamation text-dark mr-1" /> All Groups
                </Link>
            </div>          
        </div>
    );
    

    return (
    <div className="group-landing">
        <div className="container">
        <div className="row">
            <div className="col-md-12">
            <h1 className="d-flex flex-wrap justify-content-center align-items-center display-4">Groups</h1>
            {landingContent}
            </div>
        </div>
        </div>
    </div>
    );
  }
}


export default (Landing);

