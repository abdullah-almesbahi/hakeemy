import React, { useState } from "react";
import PropTypes from "prop-types";
import _DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePicker = () => {
  const [state, setState] = useState({
    startDate: new Date()
  });

  const handleChange = date => {
    setState({
      startDate: date
    });
  };

  return (
    <_DatePicker
      style={{ borderWidth: 1, borderColor: "red" }}
      selected={state.startDate}
      onChange={handleChange}
    />
  );
};

DatePicker.propTypes = {
  light: PropTypes.bool
};

export default DatePicker;
