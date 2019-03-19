import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        let landingContent;
        landingContent = (
            <div>
                <div className="btn-group-vertical d-flex flex-wrap justify-content-center align-items-center d-none d-md-none" role="group">
                    <Link to="/create-group" className="btn btn-light">
                        <i className="fas fa-user-circle text-dark mr-1" /> Create A Group
                    </Link>
                    <br />
                    <Link to="#" className="btn btn-light">
                        <i className="fas fa-user-circle text-dark mr-1" /> Search Groups
                    </Link>
                    <br />
                    <Link to="/groups" className="btn btn-light">
                        <i className="fas fa-exclamation text-dark mr-1" /> All Groups
                    </Link>
                </div>
                <div className="d-none d-md-block " role="group">
                    <br />
                    <div className="card-deck d-flex justify-content-center">
                        <div className="card bg-light text-center" >
                            <div className="card-body">
                                <h5 className="card-title">Create A Group</h5>
                                <p className="card-text">Use this to create a new group.</p>
                                <Link to="/create-group" className="btn btn-secondary">Create</Link>
                            </div>
                        </div>
                        <div className="card bg-light text-center" >
                            <div className="card-body">
                                <h5 className="card-title">Search Groups</h5>
                                <p className="card-text">Search all existing groups.</p>
                                <Link to="#" className="btn btn-secondary">Search</Link>
                            </div>
                        </div>
                        <div className="card bg-light text-center" >
                            <div className="card-body">
                                <h5 className="card-title">All Groups</h5>
                                <p className="card-text">See a listing of all groups.</p>
                                <Link to="/groups" className="btn btn-secondary">View</Link>
                            </div>
                        </div>
                    </div>
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

