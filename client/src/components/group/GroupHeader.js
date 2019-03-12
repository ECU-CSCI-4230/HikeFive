import React, { Component } from 'react';

class GroupHeader extends Component {

  render() {
    const { group } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body mb-3 group-wrapper">
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
