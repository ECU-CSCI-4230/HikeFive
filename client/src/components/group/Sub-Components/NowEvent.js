import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class NowEvent extends Component {
	render() {
		const { evt } = this.props;

		return (
			<li key={evt._id} className="list-group-item text-center border-0 bg-transparent justify-content-center align-items-center flex-column ">
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
		);
	}
}

NowEvent.propTypes = {
	comments: PropTypes.array.isRequired,
	postId: PropTypes.string.isRequired
};

export default NowEvent;