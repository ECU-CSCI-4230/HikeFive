import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEvent, getGroupByHandle } from '../../actions/groupActions';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      start: '',
      end: '',
      location: '',
      description: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getGroupByHandle(this.props.match.params.handle);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.group.group) {
      this.setState({
        handle: nextProps.group.group.handle
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const eventData = {
      handle: this.state.handle,
      name: this.state.name,
      start: this.state.start,
      end: this.state.end,
      location: this.state.location,
      description: this.state.description,
    };

    this.props.addEvent(eventData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { group } = this.props.group;

    return (
      <div className="add-event">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/edit-events/${group.handle}`} className="btn btn-secondary">
                Back
              </Link>
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
                  placeholder="* Description"
                  name="description"
                  value={this.state.description}
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
  getGroupByHandle: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  errors: state.errors
});

export default connect(mapStateToProps, { addEvent, getGroupByHandle })(
  withRouter(AddEvent)
);
