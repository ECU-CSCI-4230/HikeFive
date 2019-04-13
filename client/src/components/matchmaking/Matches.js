import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        };

        this.getMatches = this.getMatches.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.profile.profile) {
            return {
                country: nextProps.profile.profile.match.country,
                skillMin: nextProps.profile.profile.match.skillMin,
                skillMax: nextProps.profile.profile.match.skillMax,
                travel: nextProps.profile.profile.match.travel,
                camp: nextProps.profile.profile.match.camp,
                climber: nextProps.profile.profile.match.climber
            };
        }
        else return null;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.profile.profile) {
            if (prevProps.profile.profile !== this.props.profile.profile) {
                const profile = prevProps.profile.profile;
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
    }

    getMatches() {
        if (this.state.travel) {
            if (this.state.travel === 'Yes') {
                if (this.state.camp === 'Yes') {
                    if (this.state.climber === 'Yes') {
                        this.props.matchGCombo(this.state);
                        this.props.matchPCombo(this.state);
                    }
                    else {
                        this.props.matchGTC(this.state);
                        this.props.matchPTC(this.state);
                    }
                }
                else if (this.state.climber === 'Yes') {
                    this.props.matchGTCL(this.state);
                    this.props.matchPTCL(this.state);
                }
                else {
                    this.props.matchGT(this.state);
                    this.props.matchPT(this.state);
                }
            }
            else {
                if (this.state.camp === 'Yes') {
                    if (this.state.climber === 'Yes') {
                        this.props.matchGCC(this.state);
                        this.props.matchPCC(this.state);
                    }
                    else {
                        this.props.matchGC(this.state);
                        this.props.matchPC(this.state);
                    }
                }
                else if (this.state.climber === 'Yes') {
                    this.props.matchGCL(this.state);
                    this.props.matchPCL(this.state);
                }
                else {
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

        let groupItems;
        let profileItems;

        if (profile === null || loading) {
            profileItems = <Spinner />;
        }
        else {
            if (profiles !== null) {
                profileItems = profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                ));
            } else {
                profileItems = <h5 className="text-center">No Profiles Found...</h5>;
            }
            if (groups !== null) {
                groupItems = groups.map(group => (
                    <GroupItem key={group._id} group={group} />
                ));
            } else {
                groupItems = <h5 className="text-center">No Groups Found...</h5>;
            }
        }

        return (
            <div className="match" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Matches</h1>
                            <h4 className="text-center">Click the button below to show potential matches.</h4>
                            <div className="text-center justify-content-center">
                                <button className="text-center btn btn-dark btn-lg btn-rounded my-2 mb-4" type="submit" onClick={this.getMatches.bind()}>Show Matches</button>
                            </div>
                            <div className="container align-content-center justify-content-center text-center">
                                <ul className="nav nav-pills text-center nav-justified justify-content-center" id="searchResults" role="tablist">
                                    <li>&nbsp;&nbsp;&nbsp;&nbsp;</li>
                                    <li className="nav-item nav-li active text-center">
                                        <a className="nav-link text-white tab-color mb-2" id="user-tab" data-toggle="pill" href="#users" role="tab" aria-controls="users" aria-selected="true">Matching Users</a>
                                    </li>
                                    <li className="nav-item nav-li text-center">
                                        <a className="nav-link text-white tab-color mb-2" id="group-tab" data-toggle="pill" href="#groups" role="tab" aria-controls="groups" aria-selected="false">Matching Groups</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content" id="searchResultsContent">
                                <div className="tab-pane fade show active" id="users" role="tabpanel" aria-labelledby="user-tab"> <br />{profileItems}</div>
                                <div className="tab-pane fade" id="groups" role="tabpanel" aria-labelledby="group-tab">< br />{groupItems}</div>
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
    matchProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    group: state.group,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, matchGCombo, matchGTC, matchGTCL, matchGT, matchGCC, matchGC, matchGCL, matchGroups, matchPCombo, matchPTC, matchPTCL, matchPT, matchPCC, matchPC, matchPCL, matchProfiles })(Matches);