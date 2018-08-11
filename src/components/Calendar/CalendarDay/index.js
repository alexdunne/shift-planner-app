import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";

import { Col } from "../../Grid";

import "./index.css";

const CalendarDay = ({ date, backgroundColor, isToday, onClick }) => {
  return date ? (
    <Col
      className="calendar-day-block calendar-day-interactive"
      style={{ backgroundColor }}
      onClick={onClick}
    >
      <div className="calendar-day__day">{format(date, "D")}</div>
      {isToday && <div className="calendar-day__today" />}
    </Col>
  ) : (
    <Col className="calendar-day-block" />
  );
};

CalendarDay.defaultProps = {
  isToday: false
};

CalendarDay.propTypes = {
  date: PropTypes.instanceOf(Date),
  backgroundColor: PropTypes.string,
  isToday: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default CalendarDay;
