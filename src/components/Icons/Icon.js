import React from "react";
import PropTypes from "prop-types";

const SIZE_SCALE = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48
};

const Icon = ({
  children,
  size = "md",
  backgroundColor = null,
  iconColour = null
}) => {
  const containerStyles = {
    width: SIZE_SCALE[size],
    height: SIZE_SCALE[size],
    padding: `${SIZE_SCALE[size] / 1.5}px`,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  if (backgroundColor) {
    containerStyles.backgroundColor = backgroundColor;
  }

  if (iconColour) {
    containerStyles.color = iconColour;
  }

  return (
    <div style={containerStyles}>
      <div>{children}</div>
    </div>
  );
};

Icon.propTypes = {
  backgroundColor: PropTypes.string,
  iconColour: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
};

export default Icon;
