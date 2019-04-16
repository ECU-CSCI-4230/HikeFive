import React, { Component } from 'react';
import defaultAvatar from '../../../img/defaultGroupAvatar.jpg';
import defaultBackground from '../../../img/profile.jpg';


class GroupHeader extends Component {

  render() {
    const { group } = this.props;
    const backgroundURL = group.background;

    var groupAvatar;
    var groupBG;

    if (typeof group.avatar === 'undefined') {
      groupAvatar = defaultAvatar;
    }
    else {
      groupAvatar = group.avatar;
    }

    // Reference: The CSS class in App.css 'Wrapper' sets the user's profile background.
    // Reference: The CSS class in App.css 'Group-Wrapper' does the same thing, but for group bg pics.

    // Check for an empty string when determining the BG image and
    // use the default BG if it's an empty string.
    if (typeof backgroundURL === 'undefined') {
      groupBG = {
        background: 'url(' + defaultBackground + ') no-repeat center center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: '-1',
        position: 'relative',
        height: 400
      };
    } else {
      // Reference: The CSS class in App.css 'Wrapper' sets the user's profile background.
      // Reference: The CSS class in App.css 'Group-Wrapper' does the same thing, but for group bg pics.
      groupBG = {
        background: 'url(' + backgroundURL + ') no-repeat center center',
        backgroundSize: 'cover',
        zIndex: '-1',
        position: 'relative',
      };
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body mb-3" style={groupBG}>
            <div className="row">
              <div className="text-center col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={groupAvatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center text-white">
              <h1 className="display-4 text-center">{group.name}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupHeader;
