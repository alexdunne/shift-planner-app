import React from "react";
import PropTypes from "prop-types";

import Header from "../Header";
import Icon from "../Icon/Icon";

const AppHeader = ({ locked, onToggleLocked }) => (
  <Header
    left={
      <Icon
        name={locked ? "LockedLock" : "Edit"}
        size="xs"
        backgroundColor={locked ? "#F44336" : "#4CAF50"}
        iconColour="#FFFFFF"
        onPress={onToggleLocked}
      />
    }
    center={<div className="text-center">Shift planner</div>}
    right={
      <div className="float-right">
        <Icon
          name="Hamburger"
          size="xs"
          backgroundColor="#03A9F4"
          iconColour="#FFFFFF"
          onPress={onToggleLocked}
        />
      </div>
    }
  />
);

AppHeader.propTypes = {
  locked: PropTypes.bool.isRequired,
  onToggleLocked: PropTypes.func.isRequired
};

export default AppHeader;
