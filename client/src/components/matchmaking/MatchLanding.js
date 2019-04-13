import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class MatchLanding extends Component {

    render() {
        let landingContent;
        landingContent = (
            <div>
                <div className="btn-group-vertical d-flex flex-wrap justify-content-center align-items-center d-none d-md-none" role="group">
                    <Link to="/match" className="btn btn-light">
                        <i className=" text-dark mr-1" /> Find New Matches
                    </Link>
                    <br />
                    <Link to="/matches" className="btn btn-light">
                        <i className=" text-dark mr-1" /> Review Matches
                    </Link>
                </div>
                <div className="d-none d-md-block " role="group">
                    <br />
                    <div className="card-deck d-flex justify-content-center">
                        <div className="card bg-light text-center" >
                            <div className="card-body">
                                <h5 className="card-title">Find New Matches</h5>
                                <p className="card-text">This will take you to the Match-Making form.</p>
                                <Link to="/match" className="btn btn-secondary">Continue</Link>
                            </div>
                        </div>
                        <div className="card bg-light text-center" >
                            <div className="card-body">
                                <h5 className="card-title">Review Matches</h5>
                                <p className="card-text">This will show the matches from your last search</p>
                                <Link to="/matches" className="btn btn-secondary">View</Link>
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
                            <h1 className="d-flex flex-wrap justify-content-center align-items-center display-5">Matchmaking</h1>
                            {landingContent}
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

export default (withRouter(MatchLanding));

