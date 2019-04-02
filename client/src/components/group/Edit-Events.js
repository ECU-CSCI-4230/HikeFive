import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getGroupByHandle } from '../../actions/groupActions';
import Event from '../group/GroupEvents';

class EditEvent extends Component {
    componentDidMount() {
        this.props.getGroupByHandle(this.props.match.params.handle);
    }

    render() {
        const { group, loading } = this.props.group;
        let EventContent;
        if (group === null || loading) {
            EventContent = <Spinner />;
        }
        else {
            if (Object.keys(group).length > 0) {
                EventContent = (
                    <div>
                        <div className="row">
                            <div className="d-flex justify-content-end col">
                                <Link to={`/groupsettings/${group.handle}`} className="btn btn-secondary">Go Back</Link>
                            </div>
                            <div className="d-flex justify-content-start col">
                                <Link to={`/addEvent/${group.handle}`} className="btn btn-secondary">Add Event</Link>
                            </div>
                        </div>
                        <div className="col-md-12 text-center">
                        </div><br />
                        <Event events={group.events} />
                    </div>
                );
            }
        }

        return (
            <div className="edit trips">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">{EventContent}</div>
                    </div>
                </div>
            </div>
        );
    }
}

EditEvent.propTypes = {
    getGroupByHandle: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    group: state.group,
});

export default connect(mapStateToProps, { getGroupByHandle })(EditEvent);
