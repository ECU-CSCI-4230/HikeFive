import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class NowEvent extends Component {
  render() {
    const { evt } = this.props;

    return (
    	<div className="row">
        <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <li key={evt._id} className="d-flex list-group-item justify-content-center align-items-center flex-column bg-light">
        	<h4>{evt.name}</h4>
        	<p>
          		<a>Start: <Moment format="MM/DD/YY">{evt.start}</Moment> </a>
        	</p>
        	<p>
         		 <a>End: <Moment format="MM/DD/YY">{evt.end}</Moment> </a>
        	</p>
       		 <p>
         	 {evt.location === '' ? null : (
            <span>
          	    <a>Location: {evt.location} </a>
           	 </span>
          	)}
        	</p>
        	<p>
         	 About:
        	</p>
        	<p>
         	 {evt.description === '' ? null : (
           	 <span>
             	 {evt.description}
           	 </span>
          	)}
        	</p>
      	</li>
        </div>
        </div>
      </div>
   );
  }
}

NowEvent.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default NowEvent;