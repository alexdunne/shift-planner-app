import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";

import { Col } from "../../Grid";

import "./index.css";

const CalendarDay = ({ date, backgroundColor }) =>
  date ? (
    <Col className="calendar-day" style={{ backgroundColor }}>
      {format(date, "D")}
    </Col>
  ) : (
    <Col />
  );

CalendarDay.propTypes = {
  date: PropTypes.instanceOf(Date),
  backgroundColor: PropTypes.string
};

export default CalendarDay;
