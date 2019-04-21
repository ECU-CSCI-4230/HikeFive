import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import { updateAvatar } from '../../actions/authActions';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      zip: '',
      country: '',
      avatar: '',
      background: '',
      skillstatus: '',
      climber: '',
      travel: '',
      camp: '',
      bio: '',
      twitter: '',
      facebook: '',
      youtube: '',
      instagram: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If profile field doesnt exist, make empty string
      profile.zip = !isEmpty(profile.zip) ? profile.zip : '';
      profile.country = !isEmpty(profile.country) ? profile.country : '';
      profile.avatar = !isEmpty(profile.avatar) ? profile.avatar : '';
      profile.background = !isEmpty(profile.background) ? profile.background : '';
      profile.skillstatus = !isEmpty(profile.skillstatus) ? profile.skillstatus : '';
      profile.climber = !isEmpty(profile.climber) ? profile.climber : '';
      profile.travel = !isEmpty(profile.travel) ? profile.travel : '';
      profile.camp = !isEmpty(profile.camp) ? profile.camp : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        zip: profile.zip,
        country: profile.country,
        avatar: profile.avatar,
        background: profile.background,
        skillstatus: profile.skillstatus,
        climber: profile.climber,
        travel: profile.travel,
        camp: profile.camp,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      zip: this.state.zip,
      country: this.state.country,
      avatar: this.state.avatar,
      background: this.state.background,
      skillstatus: this.state.skillstatus,
      climber: this.state.climber,
      travel: this.state.travel,
      camp: this.state.camp,
      bio: this.state.bio,
      facebook: this.state.facebook,
      twitter: this.state.twitter,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);

    const avatarData = {
      id: this.props.profile.profile.user._id,
      profile_avatar: profileData.avatar
    };
    this.props.updateAvatar(avatarData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for status
    const Skilloptions = [
      { label: '* Select', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 }
    ];

    const CountryOptions = [
      { label: '* Select', value: 0 },
      { label: 'Afghanistan', value: 'AF' },
      { label: 'Åland Islands', value: 'AX' },
      { label: 'Albania', value: 'AL' },
      { label: 'Algeria', value: 'DZ' },
      { label: 'American Samoa', value: 'AS' },
      { label: 'Andorra', value: 'AD' },
      { label: 'Angola', value: 'AO' },
      { label: 'Anguilla', value: 'AI' },
      { label: 'Antarctica', value: 'AQ' },
      { label: 'Antigua and Barbuda', value: 'AG' },
      { label: 'Argentina', value: 'AR' },
      { label: 'Armenia', value: 'AM' },
      { label: 'Aruba', value: 'AW' },
      { label: 'Australia', value: 'AU' },
      { label: 'Austria', value: 'AT' },
      { label: 'Azerbaijan', value: 'AZ' },
      { label: 'Bahamas', value: 'BS' },
      { label: 'Bahrain', value: 'BH' },
      { label: 'Bangladesh', value: 'BD' },
      { label: 'Barbados', value: 'BB' },
      { label: 'Belarus', value: 'BY' },
      { label: 'Belgium', value: 'BE' },
      { label: 'Belize', value: 'BZ' },
      { label: 'Benin', value: 'BJ' },
      { label: 'Bermuda', value: 'BM' },
      { label: 'Bhutan', value: 'BT' },
      { label: 'Bolivia', value: 'BO' },
      { label: 'Bonaire', value: 'BQ' },
      { label: 'Bosnia and Herzegovina', value: 'BA' },
      { label: 'Botswana', value: 'BW' },
      { label: 'Bouvet Island', value: 'BV' },
      { label: 'Brazil', value: 'BR' },
      { label: 'British Indian Ocean Territory', value: 'IO' },
      { label: 'Brunei Darussalam', value: 'BN' },
      { label: 'Bulgaria', value: 'BG' },
      { label: 'Burkina Faso', value: 'BF' },
      { label: 'Burundi', value: 'BI' },
      { label: 'Cambodia', value: 'KH' },
      { label: 'Cameroon', value: 'CM' },
      { label: 'Canada', value: 'CA' },
      { label: 'Cape Verde', value: 'CV' },
      { label: 'Cayman Islands', value: 'KY' },
      { label: 'Central African Republic', value: 'CF' },
      { label: 'Chad', value: 'TD' },
      { label: 'Chile', value: 'CL' },
      { label: 'China', value: 'CN' },
      { label: 'Christmas Island', value: 'CX' },
      { label: 'Cocos (Keeling) Islands', value: 'CC' },
      { label: 'Colombia', value: 'CO' },
      { label: 'Comoros', value: 'KM' },
      { label: 'Congo', value: 'CG' },
      { label: 'Congo the Democratic Republic of the', value: 'CD' },
      { label: 'Cook Islands', value: 'CK' },
      { label: 'Costa Rica', value: 'CR' },
      { label: 'Côte d\'Ivoire', value: 'CI' },
      { label: 'Croatia', value: 'HR' },
      { label: 'Cuba', value: 'CU' },
      { label: 'Curaçao', value: 'CW' },
      { label: 'Cyprus', value: 'CY' },
      { label: 'Czech Republic', value: 'CZ' },
      { label: 'Denmark', value: 'DK' },
      { label: 'Djibouti', value: 'DJ' },
      { label: 'Dominica', value: 'DM' },
      { label: 'Dominican Republic', value: 'DO' },
      { label: 'Ecuador', value: 'EC' },
      { label: 'Egypt', value: 'EG' },
      { label: 'El Salvador', value: 'SV' },
      { label: 'Equatorial Guinea', value: 'GQ' },
      { label: 'Eritrea', value: 'ER' },
      { label: 'Estonia', value: 'EE' },
      { label: 'Ethiopia', value: 'ET' },
      { label: 'Falkland Islands (Malvinas)', value: 'FK' },
      { label: 'Faroe Islands', value: 'FO' },
      { label: 'Fiji', value: 'FJ' },
      { label: 'Finland', value: 'FI' },
      { label: 'France', value: 'FR' },
      { label: 'French Guiana', value: 'GF' },
      { label: 'French Polynesia', value: 'PF' },
      { label: 'French Southern Territories', value: 'TF' },
      { label: 'Gabon', value: 'GA' },
      { label: 'Gambia', value: 'GM' },
      { label: 'Georgia', value: 'GE' },
      { label: 'Germany', value: 'DE' },
      { label: 'Ghana', value: 'GH' },
      { label: 'Gibraltar', value: 'GI' },
      { label: 'Greece', value: 'GR' },
      { label: 'Greenland', value: 'GL' },
      { label: 'Grenada', value: 'GD' },
      { label: 'Guadeloupe', value: 'GP' },
      { label: 'Guam', value: 'GU' },
      { label: 'Guatemala', value: 'GT' },
      { label: 'Guernsey', value: 'GG' },
      { label: 'Guinea', value: 'GN' },
      { label: 'Guinea-Bissau', value: 'GW' },
      { label: 'Guyana', value: 'GY' },
      { label: 'Haiti', value: 'HT' },
      { label: 'Heard Island and McDonald Islands', value: 'HM' },
      { label: 'Holy See (Vatican City State)', value: 'VA' },
      { label: 'Honduras', value: 'HN' },
      { label: 'Hong Kong', value: 'HK' },
      { label: 'Hungary', value: 'HU' },
      { label: 'Iceland', value: 'IS' },
      { label: 'India', value: 'IN' },
      { label: 'Indonesia', value: 'ID' },
      { label: 'Iran', value: 'IR' },
      { label: 'Iraq', value: 'IQ' },
      { label: 'Ireland', value: 'IE' },
      { label: 'Isle of Man', value: 'IM' },
      { label: 'Israel', value: 'IL' },
      { label: 'Italy', value: 'IT' },
      { label: 'Jamaica', value: 'JM' },
      { label: 'Japan', value: 'JP' },
      { label: 'Jersey', value: 'JE' },
      { label: 'Jordan', value: 'JO' },
      { label: 'Kazakhstan', value: 'KZ' },
      { label: 'Kenya', value: 'KE' },
      { label: 'Kiribati', value: 'KI' },
      { label: 'Korea Democratic Peoples Republic of', value: 'KP' },
      { label: 'Korea  Republic of', value: 'KR' },
      { label: 'Kuwait', value: 'KW' },
      { label: 'Kyrgyzstan', value: 'KG' },
      { label: 'Lao Peoples Democratic Republic', value: 'LA' },
      { label: 'Latvia', value: 'LV' },
      { label: 'Lebanon', value: 'LB' },
      { label: 'Lesotho', value: 'LS' },
      { label: 'Liberia', value: 'LR' },
      { label: 'Libya', value: 'LY' },
      { label: 'Liechtenstein', value: 'LI' },
      { label: 'Lithuania', value: 'LT' },
      { label: 'Luxembourg', value: 'LU' },
      { label: 'Macao', value: 'MO' },
      { label: 'Macedonia', value: 'MK' },
      { label: 'Madagascar', value: 'MG' },
      { label: 'Malawi', value: 'MW' },
      { label: 'Malaysia', value: 'MY' },
      { label: 'Maldives', value: 'MV' },
      { label: 'Mali', value: 'ML' },
      { label: 'Malta', value: 'MT' },
      { label: 'Marshall Islands', value: 'MH' },
      { label: 'Martinique', value: 'MQ' },
      { label: 'Mauritania', value: 'MR' },
      { label: 'Mauritius', value: 'MU' },
      { label: 'Mayotte', value: 'YT' },
      { label: 'Mexico', value: 'MX' },
      { label: 'Micronesia', value: 'FM' },
      { label: 'Moldova', value: 'MD' },
      { label: 'Monaco', value: 'MC' },
      { label: 'Mongolia', value: 'MN' },
      { label: 'Montenegro', value: 'ME' },
      { label: 'Montserrat', value: 'MS' },
      { label: 'Morocco', value: 'MA' },
      { label: 'Mozambique', value: 'MZ' },
      { label: 'Myanmar', value: 'MM' },
      { label: 'Namibia', value: 'NA' },
      { label: 'Nauru', value: 'NR' },
      { label: 'Nepal', value: 'NP' },
      { label: 'Netherlands', value: 'NL' },
      { label: 'New Caledonia', value: 'NC' },
      { label: 'New Zealand', value: 'NZ' },
      { label: 'Nicaragua', value: 'NI' },
      { label: 'Niger', value: 'NE' },
      { label: 'Nigeria', value: 'NG' },
      { label: 'Niue', value: 'NU' },
      { label: 'Norfolk Island', value: 'NF' },
      { label: 'Northern Mariana Islands', value: 'MP' },
      { label: 'Norway', value: 'NO' },
      { label: 'Oman', value: 'OM' },
      { label: 'Pakistan', value: 'PK' },
      { label: 'Palau', value: 'PW' },
      { label: 'Palestine', value: 'PS' },
      { label: 'Panama', value: 'PA' },
      { label: 'Papua New Guinea', value: 'PG' },
      { label: 'Paraguay', value: 'PY' },
      { label: 'Peru', value: 'PE' },
      { label: 'Philippines', value: 'PH' },
      { label: 'Pitcairn', value: 'PN' },
      { label: 'Poland', value: 'PL' },
      { label: 'Portugal', value: 'PT' },
      { label: 'Puerto Rico', value: 'PR' },
      { label: 'Qatar', value: 'QA' },
      { label: 'Réunion', value: 'RE' },
      { label: 'Romania', value: 'RO' },
      { label: 'Russian Federation', value: 'RU' },
      { label: 'Rwanda', value: 'RW' },
      { label: 'Saint Barthélemy', value: 'BL' },
      { label: 'Saint Helena', value: 'SH' },
      { label: 'Saint Kitts and Nevis', value: 'KN' },
      { label: 'Saint Lucia', value: 'LC' },
      { label: 'Saint Martin (French part)', value: 'MF' },
      { label: 'Saint Pierre and Miquelon', value: 'PM' },
      { label: 'Saint Vincent and the Grenadines', value: 'VC' },
      { label: 'Samoa', value: 'WS' },
      { label: 'San Marino', value: 'SM' },
      { label: 'Sao Tome and Principe', value: 'ST' },
      { label: 'Saudi Arabia', value: 'SA' },
      { label: 'Senegal', value: 'SN' },
      { label: 'Serbia', value: 'RS' },
      { label: 'Seychelles', value: 'SC' },
      { label: 'Sierra Leone', value: 'SL' },
      { label: 'Singapore', value: 'SG' },
      { label: 'Sint Maarten (Dutch part)', value: 'SX' },
      { label: 'Slovakia', value: 'SK' },
      { label: 'Slovenia', value: 'SI' },
      { label: 'Solomon Islands', value: 'SB' },
      { label: 'Somalia', value: 'SO' },
      { label: 'South Africa', value: 'ZA' },
      { label: 'South Georgia and the South Sandwich Islands', value: 'GS' },
      { label: 'South Sudan', value: 'SS' },
      { label: 'Spain', value: 'ES' },
      { label: 'Sri Lanka', value: 'LK' },
      { label: 'Sudan', value: 'SD' },
      { label: 'Suriname', value: 'SR' },
      { label: 'Svalbard and Jan Mayen', value: 'SJ' },
      { label: 'Swaziland', value: 'SZ' },
      { label: 'Sweden', value: 'SE' },
      { label: 'Switzerland', value: 'CH' },
      { label: 'Syrian Arab Republic', value: 'SY' },
      { label: 'Taiwan', value: 'TW' },
      { label: 'Tajikistan', value: 'TJ' },
      { label: 'Tanzania', value: 'TZ' },
      { label: 'Thailand', value: 'TH' },
      { label: 'Timor-Leste', value: 'TL' },
      { label: 'Togo', value: 'TG' },
      { label: 'Tokelau', value: 'TK' },
      { label: 'Tonga', value: 'TO' },
      { label: 'Trinidad and Tobago', value: 'TT' },
      { label: 'Tunisia', value: 'TN' },
      { label: 'Turkey', value: 'TR' },
      { label: 'Turkmenistan', value: 'TM' },
      { label: 'Turks and Caicos Islands', value: 'TC' },
      { label: 'Tuvalu', value: 'TV' },
      { label: 'Uganda', value: 'UG' },
      { label: 'Ukraine', value: 'UA' },
      { label: 'United Arab Emirates', value: 'AE' },
      { label: 'United Kingdom', value: 'GB' },
      { label: 'United States', value: 'US' },
      { label: 'United States Minor Outlying Islands', value: 'UM' },
      { label: 'Uruguay', value: 'UY' },
      { label: 'Uzbekistan', value: 'UZ' },
      { label: 'Vanuatu', value: 'VU' },
      { label: 'Venezuela', value: 'VE' },
      { label: 'Vietnam', value: 'VN' },
      { label: 'British Virgin Islands', value: 'VG' },
      { label: 'U.S.Virgin Islands', value: 'VI' },
      { label: 'Wallis and Futuna', value: 'WF' },
      { label: 'Western Sahara', value: 'EH' },
      { label: 'Yemen', value: 'YE' },
      { label: 'Zambia', value: 'ZM' },
      { label: 'Zimbabwe', value: 'ZW' },
    ];

    const options = [
      { label: '* Select', value: 0 },
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' }
    ];

    return (
      <div className="edit-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/user-settings`} className="btn btn-dark">
                Go Back
            </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <h5 className="d-block pb-3">* denotes a required field</h5>
              <form onSubmit={this.onSubmit}>
                <h6>What is your zip code?</h6>
                <TextFieldGroup
                  placeholder=""
                  name="zip"
                  value={this.state.zip}
                  onChange={this.onChange}
                  error={errors.zip}
                />
                <h6>Select Your Country</h6>
                <SelectListGroup
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  options={CountryOptions}
                  error={errors.country}
                />
                <h6>What is your avatar image address?</h6>
                <TextFieldGroup
                  placeholder=""
                  name="avatar"
                  value={this.state.avatar}
                  onChange={this.onChange}
                  error={errors.avatar}
                />
                <h6>What is your profile background image address?</h6>
                <TextFieldGroup
                  placeholder=""
                  name="background"
                  value={this.state.background}
                  onChange={this.onChange}
                  error={errors.background}
                />
                <h6>What is your skill level?</h6>
                <SelectListGroup
                  name="skillstatus"
                  value={this.state.skillstatus}
                  onChange={this.onChange}
                  options={Skilloptions}
                  error={errors.skillstatus}
                />
                <h6>Are you a Climber?</h6>
                <SelectListGroup
                  name="climber"
                  value={this.state.climber}
                  onChange={this.onChange}
                  options={options}
                  error={errors.climber}
                />
                <h6>Are you willing to travel to other countries?</h6>
                <SelectListGroup
                  name="travel"
                  value={this.state.travel}
                  onChange={this.onChange}
                  options={options}
                  error={errors.travel}
                />
                <h6>Are you willing to camp?</h6>
                <SelectListGroup
                  name="camp"
                  value={this.state.camp}
                  onChange={this.onChange}
                  options={options}
                  error={errors.camp}
                />
                <h6>Tell us a little about your yourself</h6>
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                </button>{" "}
                  <span>Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-dark btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}


EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile, updateAvatar })(
  withRouter(EditProfile)
);