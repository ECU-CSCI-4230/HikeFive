import React from 'react';
import BigCalendar from 'react-big-calendar'
import events from './events'
import ControlSlot from './ControlSlot'
import moment from 'moment'

const propTypes = {}

class Selectable extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = { events }
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  render() {
    //const { localizer } = this.props
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
    return (
      <>
        <ControlSlot.Entry waitForOutlet>
          <strong>
            Click an event to see more info, or drag the mouse over the calendar
            to select a date/time range.
          </strong>
        </ControlSlot.Entry>
        <BigCalendar
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={BigCalendar.Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
        />
      </>
    )
  }
}

Selectable.propTypes = propTypes

export default Selectable