import React from "react";
import PropTypes from "prop-types";

import Picker from "components/Picker";

const year = new Date().getFullYear();
const options = [];

for (let i = year - 2; i < year + 3; i++) {
  options.push(i.toString());
}

const YearPicker = ({ value, onChange }) => (
  <Picker
    options={options}
    onChange={option => onChange({ value: parseInt(option.value, 10), label: option.label })}
    value={value.toString()}
  />
);

YearPicker.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default YearPicker;
