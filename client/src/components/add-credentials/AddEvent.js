
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEvent } from '../../actions/groupActions';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      start: '',
      end: '',
      location: '',
      info: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const eventData = {
      name: this.state.name,
      start: this.state.start,
      end: this.state.end,
      location: this.state.location,
      info: this.state.info,
    };
    //console.log(this.props.match.params.handle);
    this.props.addEvent(this.props.match.params.handle, eventData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    return (
      <div className="add-event">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add An Event</h1>
              <p className="lead text-center">
                *All fields are required*
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* Start of Event MM/DD/YYYY"
                  name="start"
                  value={this.state.start}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* End of Event MM/DD/YYYY"
                  name="end"
                  value={this.state.end}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* Info"
                  name="info"
                  value={this.state.info}
                  onChange={this.onChange}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-secondary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEvent.propTypes = {
  addEvent: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  errors: state.errors
});

export default connect(mapStateToProps, { addEvent })(
  withRouter(AddEvent)
);
