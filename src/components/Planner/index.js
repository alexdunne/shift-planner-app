import React from "react";
import PropTypes from "prop-types";
import eachDay from "date-fns/each_day";
import endOfMonth from "date-fns/end_of_month";
import startOfWeek from "date-fns/start_of_week";
import lastDayOfWeek from "date-fns/last_day_of_week";
import format from "date-fns/format";
import differenceInDays from "date-fns/difference_in_days";
import isLastDayOfMonth from "date-fns/is_last_day_of_month";
import isEqual from "date-fns/is_equal";
import memoizeOne from "memoize-one";

import { Container, Row, Col } from "../Grid";

import "./index.css";

/**
 * Given a month and a year, this function builds up a 2D array of each
 * week in the month and each day in the week. Where weeks do not have 7 days
 * which all belong to the same month (e.g. 1st is a Wednesday) null is used
 * as a placeholder
 */
const getWeeks = memoizeOne((month, year) => {
  const weeks = [];

  const startDate = new Date(year, month, 1);
  const days = eachDay(startDate, endOfMonth(startDate));

  let week = [];

  // We may need to pad the start of the first week if it is not a monday
  const firstDayOfTheWeek = startOfWeek(days[0]);
  const firstWeekPlaceholderCount = differenceInDays(
    days[0],
    firstDayOfTheWeek
  );

  if (firstWeekPlaceholderCount > 0) {
    for (let i = 0; i < firstWeekPlaceholderCount; i++) {
      week.push(null);
    }
  }

  days.forEach(day => {
    week.push(day);

    if (isEqual(day, lastDayOfWeek(day)) || isLastDayOfMonth(day)) {
      if (isLastDayOfMonth(day)) {
        // We may also need to pad out the days in the last week
        for (let i = 0; i < 7 - week.length; i++) {
          week.push(null);
        }
      }

      weeks.push(week);
      week = [];
    }
  });

  return weeks;
});

const Planner = ({ month, year }) => {
  const weeks = getWeeks(month, year);

  return (
    <section className="planner">
      <Container>
        {weeks.map((week, index) => (
          <Row key={index}>
            {week.map((day, index) => (
              <Col key={index}>{day ? format(day, "D") : <div />}</Col>
            ))}
          </Row>
        ))}
      </Container>
    </section>
  );
};

Planner.propTypes = {
  month: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).isRequired,
  year: PropTypes.number.isRequired
};

export default Planner;
