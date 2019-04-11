import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';

class Matches extends Component {
    componentDidMount() {
        console.log(this.props.location.data);
        
    }

    render() {
        //const { groups, loading } = this.props.group;
        let matchItems;

        matchItems = <Spinner />;
        /*
        if (groups === null || loading) {
            searchItems = <Spinner />;
        } else {
            if (groups.length > 0) {
                searchItems = groups.map(group => (
                    <GroupItem key={group._id} group={group} />
                ));
            }
            else {
                searchItems = <h4>No profiles found...</h4>;
            }
        }
        */

        return (
            <div className="search">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Matches</h1>
                            {matchItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
/*
Matches.propTypes = {
    group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    group: state.group
});

export default connect(mapStateToProps, { searchGroups })(withRouter(Matches));
*/
export default Matches;