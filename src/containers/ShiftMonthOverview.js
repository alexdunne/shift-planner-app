import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { CalendarDay, MonthOverview } from "components/Calendar";
import { getShiftsForMonthAndYear } from "features/shifts/selectors";

const ShiftMonthOverview = ({ month, year, today, shifts, onDateClicked }) => (
  <MonthOverview
    month={month}
    year={year}
    renderDay={({ date }) => {
      const shift = date ? shifts[date.getTime()] : null;

      return (
        <CalendarDay
          date={date}
          backgroundColor={shift && shift.shiftType.color}
          isToday={date && date.getTime() === today.getTime()}
          onClick={() => onDateClicked(shift, date)}
        />
      );
    }}
  />
);

ShiftMonthOverview.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  today: PropTypes.instanceOf(Date).isRequired,
  shifts: PropTypes.object.isRequired,
  onDateClicked: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  shifts: getShiftsForMonthAndYear(state, props)
});

export default connect(mapStateToProps)(ShiftMonthOverview);
