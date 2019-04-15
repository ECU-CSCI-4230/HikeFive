import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGroupByHandle } from '../../../actions/groupActions';
import { format, compareAsc } from 'date-fns';
import NowEvent from './NowEvent';
import dateFns from "date-fns";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row  text-center flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            Previous Month
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">Next Month</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center text-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
              }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day,
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    const { selectedDate } = this.state;
    var eventLength = this.props.group.group.events.length;
    const eventArray = [];

    let eventsContent;

    for (let i = 0; i < eventLength; i++) {
      const startEvent = format(this.props.group.group.events[i].start, 'MM/DD/YYYY');
      const nowDate = format(selectedDate, 'MM/DD/YYYY');

      var result = compareAsc(
        startEvent,
        nowDate
      );
      if (result === 0) {
        eventArray.push(this.props.group.group.events[i]);
      }
    }

    var eventL = eventArray.length;

    if (eventL > 0) {
      eventsContent = eventArray.map(evt => (<NowEvent evt={evt} />));
    } else {
      eventsContent = <div className="d-flex list-group-item justify-content-center align-items-center flex-column bg-transparent border-0">There are no events for this date</div>;
    }

    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        {eventsContent}
      </div>
    );
  }
}

Calendar.propTypes = {
  getGroupByHandle: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, { getGroupByHandle })(Calendar);