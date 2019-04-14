import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import GroupItem from '../groups/GroupItem';
import { searchGroups } from '../../actions/groupActions';

class Search extends Component {
    componentDidMount() {
        var query = this.props.match.params.searchString;
        this.props.searchGroups(query);
    }

    onSearchClick = () => {
        var searchString = document.getElementById("query3").value;
        if (searchString !== '') {
            this.props.history.push(`/searchGroups/${searchString}`);
        }
    }

    render() {
        const { groups, loading } = this.props.group;

        let searchItems;
        let searchForm;

        searchForm = (
            <div >
                <form className="form-inline md-form mr-auto justify-content-center ">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="query3" />
                    <button className="btn btn-elegant btn-secondary  my-0 d-none d-lg-block" type="submit" onClick={this.onSearchClick.bind()}>Search</button>
                </form>
                <br />
            </div>
        );
        if (this.props.match.params.searchString === ' ') {
            searchItems = null;
        }
        else if (groups === null || loading) {
            searchItems = <Spinner />;
        } else {
            if (groups.length > 0) {
                searchItems = groups.map(group => (
                    <GroupItem key={group._id} group={group} />
                ));
            }
            else {
                searchItems = <h4>No Groups Found...</h4>;
            }
        }

        return (
            <div className="search">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Search Results</h1>
                            <p className="lead text-center">
                                Searched For: {this.props.match.params.searchString}
                            </p>
                            {searchForm}
                            {searchItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    searchGroups: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    group: state.group
});

export default connect(mapStateToProps, { searchGroups })(withRouter(Search));
