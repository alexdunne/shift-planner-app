import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import format from "date-fns/format";

import { Col } from "../../Grid";

import "./index.css";

const CalendarDay = ({ date, backgroundColor, isToday, onClick }) => {
  const className = classnames("calendar-day__day", {
    "calendar-day__day--today": isToday
  });

  return date ? (
    <Col
      className="calendar-day-block calendar-day-interactive"
      style={{ backgroundColor }}
      onClick={onClick}
    >
      <div className={className}>{format(date, "D")}</div>
    </Col>
  ) : (
    <Col className="calendar-day-block" />
  );
};

CalendarDay.propTypes = {
  date: PropTypes.instanceOf(Date),
  backgroundColor: PropTypes.string,
  isToday: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CalendarDay;
