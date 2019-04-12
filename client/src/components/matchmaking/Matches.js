import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from '../profiles/ProfileItem';
import GroupItem from '../groups/GroupItem';
import { getCurrentProfile } from '../../actions/profileActions';
import { matchGCombo, matchGTC, matchGTCL, matchGT, matchGCC, matchGC, matchGCL, matchGroups } from '../../actions/groupActions';
import { matchPCombo, matchPTC, matchPTCL, matchPT, matchPCC, matchPC, matchPCL, matchProfiles } from '../../actions/profileActions';


class Matches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        };

        this.getMatches = this.getMatches.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;
            this.setState({
                country: profile.match.country,
                skillMin: profile.match.skillMin,
                skillMax: profile.match.skillMax,
                travel: profile.match.travel,
                camp: profile.match.camp,
                climber: profile.match.climber
            });
        }
    }

    getMatches() {
        console.log(this.state);
        if (this.state.travel) {
            if (this.state.travel === 'Yes') {
                if (this.state.camp === 'Yes') {
                    if (this.state.climber === 'Yes') {
                        console.log('Call matchGCombo()');
                        this.props.matchGCombo(this.state);
                        this.props.matchPCombo(this.state);
                    }
                    else {
                        console.log('Call matchGTC()');
                        this.props.matchGTC(this.state);
                        this.props.matchPTC(this.state);
                    }
                }
                else if (this.state.climber === 'Yes') {
                    console.log('Call matchGTCL()');
                    this.props.matchGTCL(this.state);
                    this.props.matchPTCL(this.state);
                }
                else {
                    console.log('Call matchGT()');
                    this.props.matchGT(this.state);
                    this.props.matchPT(this.state);
                }
            }
            else {
                if (this.state.camp === 'Yes') {
                    if (this.state.climber === 'Yes') {
                        console.log('Call matchGCC()');
                        this.props.matchGCC(this.state);
                        this.props.matchPCC(this.state);
                    }
                    else {
                        console.log('Call matchGC()');
                        this.props.matchGC(this.state);
                        this.props.matchPC(this.state);
                    }
                }
                else if (this.state.climber === 'Yes') {
                    console.log('Call matchGCL()');
                    this.props.matchGCL(this.state);
                    this.props.matchPCL(this.state);
                }
                else {
                    console.log('Call matchGroups()');
                    this.props.matchGroups(this.state);
                    this.props.matchProfiles(this.state);
                }
            }
        }
    }

    render() {
        const { groups, loading } = this.props.group;
        const { profile } = this.props.profile;
        const { profiles } = this.props.profile;
        const { errors } = this.state;

        let groupItems;
        let profileItems;

        if (profile === null || loading) {
            profileItems = <Spinner />;
        }
        else {
            console.log(this.props);
            if (profiles !== null) {
                profileItems = profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                ));
            } else {
                profileItems = <h4>No profiles found...</h4>;
            }
            if (groups !== null) {
                groupItems = groups.map(group => (
                    <GroupItem key={group._id} group={group} />
                ));
            } else {
                groupItems = <h4>No Groups found...</h4>;
            }
           
        }
        return (
            <div className="match" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Matches</h1>
                            <ul className="nav nav-pills justify-content-center" id="searchResults" role="tablist">
                                <li className="nav-item nav-li active">
                                    <a className="nav-link text-white tab-color active" id="user-tab" data-toggle="pill" href="#users" role="tab" aria-controls="users" aria-selected="true">Users</a>
                                </li>
                                <li className="nav-item nav-li">
                                    <a className="nav-link text-white tab-color" id="group-tab" data-toggle="pill" href="#groups" role="tab" aria-controls="groups" aria-selected="false">Groups</a>
                                </li>
                            </ul>

                            <button className="btn btn-elegant btn-rounded btn-sm my-0 d-none d-lg-block" type="submit" onClick={this.getMatches.bind()}>Search</button>
                            <div className="tab-content" id="searchResultsContent">
                                <div className="tab-pane fade show active" id="users" role="tabpanel" aria-labelledby="user-tab"> <br />{profileItems}</div>
                                <div className="tab-pane fade" id="groups" role="tabpanel" aria-labelledby="group-tab">< br /> {groupItems}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


Matches.propTypes = {
    group: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    matchGCombo: PropTypes.func.isRequired,
    matchGTC: PropTypes.func.isRequired,
    matchGTCL: PropTypes.func.isRequired,
    matchGT: PropTypes.func.isRequired,
    matchGCC: PropTypes.func.isRequired,
    matchGC: PropTypes.func.isRequired,
    matchGCL: PropTypes.func.isRequired,
    matchGroups: PropTypes.func.isRequired,
    matchPCombo: PropTypes.func.isRequired,
    matchPTC: PropTypes.func.isRequired,
    matchPTCL: PropTypes.func.isRequired,
    matchPT: PropTypes.func.isRequired,
    matchPCC: PropTypes.func.isRequired,
    matchPC: PropTypes.func.isRequired,
    matchPCL: PropTypes.func.isRequired,
    matchProfiles: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    group: state.group,
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {  getCurrentProfile, matchGCombo, matchGTC, matchGTCL, matchGT, matchGCC, matchGC, matchGCL, matchGroups, matchPCombo, matchPTC, matchPTCL, matchPT, matchPCC, matchPC, matchPCL, matchProfiles })(Matches);
