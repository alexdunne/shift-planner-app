import React from "react";
import PropTypes from "prop-types";

const availableIcons = {
  Hamburger: require("./Hamburger").default,
  LockedLock: require("./LockedLock").default,
  UnlockedLock: require("./UnlockedLock").default
};

const SIZE_SCALE = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48
};

const Icon = ({
  backgroundColor = null,
  name = null,
  iconColour = null,
  size = "md"
}) => {
  const containerStyles = {
    width: SIZE_SCALE[size],
    height: SIZE_SCALE[size],
    padding: `${SIZE_SCALE[size] / 1.5}px`,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem"
  };

  if (backgroundColor) {
    containerStyles.backgroundColor = backgroundColor;
  }

  if (iconColour) {
    containerStyles.color = iconColour;
  }

  const Icon = availableIcons[name];

  return (
    <div style={containerStyles}>
      <div>
        <Icon />
      </div>
    </div>
  );
};

Icon.propTypes = {
  backgroundColor: PropTypes.string,
  name: PropTypes.oneOf(["Hamburger", "LockedLock", "UnlockedLock"]).isRequired,
  iconColour: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
};

export default Icon;
