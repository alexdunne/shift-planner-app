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

import { Container, Row, Col } from "../../Grid";

/**
 * Given a date, this function builds up a 2D array of each
 * week in the month and each day in the week. Where weeks do not have 7 days
 * which all belong to the same month (e.g. 1st is a Wednesday) null is used
 * as a placeholder
 */
const getWeeks = memoizeOne((month, year) => {
  const startDate = new Date(year, month - 1, 1);

  const weeks = [];
  let week = [];

  const days = eachDay(startDate, endOfMonth(startDate));
  const firstDayOfTheMonth = days[0];

  const firstWeekPlaceholderCount = differenceInDays(
    firstDayOfTheMonth,
    startOfWeek(firstDayOfTheMonth, { weekStartsOn: 1 })
  );

  for (let i = 0; i < firstWeekPlaceholderCount; i++) {
    week.push(null);
  }

  days.forEach(day => {
    week.push(day);

    if (
      isEqual(day, lastDayOfWeek(day, { weekStartsOn: 1 })) ||
      isLastDayOfMonth(day)
    ) {
      if (isLastDayOfMonth(day)) {
        while (week.length < 7) {
          week.push(null);
        }
      }

      weeks.push(week);
      week = [];
    }
  });

  return weeks;
});

const Overview = ({ month, year, renderDay }) => {
  if (!month || !year) {
    console.warn("Props month and year are both required");
    return null;
  }

  const weeks = getWeeks(month, year);

  return (
    <section className="overview">
      <Container>
        {weeks.map((week, index) => (
          <Row key={index} className="mb-1">
            {week.map((day, index) => (
              <React.Fragment key={index}>
                {renderDay({ date: day })}
              </React.Fragment>
            ))}
          </Row>
        ))}
      </Container>
    </section>
  );
};

Overview.defaultProps = {
  renderDay: ({ date }) => <Col>{date ? format(date, "D") : null}</Col>
};

Overview.propTypes = {
  month: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).isRequired,
  year: PropTypes.number.isRequired,
  renderDay: PropTypes.func
};

export default Overview;
