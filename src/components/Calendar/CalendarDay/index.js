import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";

import { Col } from "../../Grid";

import "./index.css";

const CalendarDay = ({ date, backgroundColor, onClick }) =>
  date ? (
    <Col
      className="calendar-day-block calendar-day-interactive"
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {format(date, "D")}
    </Col>
  ) : (
    <Col className="calendar-day-block" />
  );

CalendarDay.propTypes = {
  date: PropTypes.instanceOf(Date),
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default CalendarDay;
