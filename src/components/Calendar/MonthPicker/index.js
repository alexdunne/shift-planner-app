import React from "react";
import PropTypes from "prop-types";

import Picker from "../../Picker";

const options = [
  {
    value: 1,
    label: "January"
  },
  {
    value: 2,
    label: "February"
  },
  {
    value: 3,
    label: "March"
  },
  {
    value: 4,
    label: "April"
  },
  {
    value: 5,
    label: "May"
  },
  {
    value: 6,
    label: "June"
  },
  {
    value: 7,
    label: "July"
  },
  {
    value: 8,
    label: "August"
  },
  {
    value: 9,
    label: "September"
  },
  {
    value: 10,
    label: "October"
  },
  {
    value: 11,
    label: "November"
  },
  {
    value: 12,
    label: "December"
  }
];

const MonthPicker = ({ value, onChange }) => (
  <Picker options={options} onChange={onChange} value={options[value - 1]} />
);

MonthPicker.propTypes = {
  value: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).isRequired,
  onChange: PropTypes.func.isRequired
};

export default MonthPicker;
