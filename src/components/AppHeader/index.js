import React from "react";

import Header from "../Header";
import Icon from "../Icon/Icon";

const AppHeader = () => (
  <Header
    left={
      <Icon
        name="LockedLock"
        size="xs"
        backgroundColor="#F44336"
        iconColour="#FFFFFF"
      />
    }
    right={
      <Icon
        name="Hamburger"
        size="xs"
        backgroundColor="#03A9F4"
        iconColour="#FFFFFF"
      />
    }
  />
);

export default AppHeader;
