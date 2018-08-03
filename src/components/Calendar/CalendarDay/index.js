import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";

import "./index.css";

const CalendarDay = ({ date, backgroundColor }) => (
  <div className="calendar-day" style={{ backgroundColor }}>
    {date ? format(date, "D") : null}
  </div>
);

CalendarDay.propTypes = {
  date: PropTypes.instanceOf(Date),
  backgroundColor: PropTypes.string
};

export default CalendarDay;
