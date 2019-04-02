import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Landing extends Component {

    onSearchClick = () => {
        var searchString = document.getElementById("query2").value;
        console.log(searchString);
        if (searchString !== '') {
            this.props.history.push(`/searchGroups/${searchString}`);
        }
    }

    render() {
        let landingContent;
        landingContent = (
            <div>
                <div className="btn-group-vertical d-flex flex-wrap justify-content-center align-items-center d-none d-md-none" role="group">
                    <Link to="/create-group" className="btn btn-light">
                        <i className=" text-dark mr-1" /> Create A Group
                    </Link>
                    <br />
                    <Link to="#" className="btn btn-light">
                        <i className=" text-dark mr-1" /> Search Groups
                    </Link>
                    <br />
                    <Link to="/mygroups" className="btn btn-light">
                        <i className=" text-dark mr-1" /> My Groups
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
                                <form className="form-inline md-form mr-auto ">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="query2" />
                                    <button className="btn btn-secondary btn-rounded  my-0 d-none d-lg-block" type="submit"  onClick={this.onSearchClick.bind()}>Search</button>
                                </form>
                            </div>
                        </div>
                        <div className="card bg-light text-center" >
                            <div className="card-body">
                                <h5 className="card-title">My Groups</h5>
                                <p className="card-text">See all the groups you are a member of</p>
                                <Link to="/mygroups" className="btn btn-secondary">View</Link>
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


export default (withRouter (Landing));

