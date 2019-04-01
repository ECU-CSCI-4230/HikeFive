import React, { Component } from 'react';

class GroupHeader extends Component {

  render() {
    const { group } = this.props;
    const backgroundURL = group.background;

    // Reference: The CSS class in App.css 'Wrapper' sets the user's profile background.
    // Reference: The CSS class in App.css 'Group-Wrapper' does the same thing, but for group bg pics.

    const groupBG = {
      backgroundColor: 'red',
      background: 'url(' + backgroundURL + ') no-repeat center center',
      backgroundSize:'cover',
      zIndex: '-1',
      position: 'relative',
      height: '25vh',
    };

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body mb-3" style={groupBG}>
            <div className="row">
                <div className="text-center col-4 col-md-3 m-auto">
                  <img
                    className="rounded-circle"
                    src={group.avatar}
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
