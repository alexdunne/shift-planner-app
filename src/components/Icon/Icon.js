import React from "react";
import PropTypes from "prop-types";

const availableIcons = {
  Edit: require("./Edit").default,
  Github: require("./Github").default,
  Hamburger: require("./Hamburger").default,
  LockedLock: require("./LockedLock").default,
  Link: require("./Link").default,
  Trash: require("./Trash").default,
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
  size = "md",
  containerStyles = {},
  onPress
}) => {
  const iconContainerStyles = {
    width: SIZE_SCALE[size],
    height: SIZE_SCALE[size],
    padding: `${SIZE_SCALE[size] / 1.5}px`,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    cursor: "pointer",
    boxSizing: "initial",
    lineHeight: "1",
    ...containerStyles
  };

  if (backgroundColor) {
    iconContainerStyles.backgroundColor = backgroundColor;
  }

  if (iconColour) {
    iconContainerStyles.color = iconColour;
  }

  const Icon = availableIcons[name];

  return (
    <div style={iconContainerStyles} onClick={onPress}>
      <div className="fill-width">
        <Icon />
      </div>
    </div>
  );
};

Icon.propTypes = {
  backgroundColor: PropTypes.string,
  name: PropTypes.oneOf([
    "Edit",
    "Hamburger",
    "LockedLock",
    "UnlockedLock",
    "Link",
    "Github",
    "Trash"
  ]).isRequired,
  iconColour: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  containerStyles: PropTypes.object,
  onPress: PropTypes.func
};

export default Icon;
