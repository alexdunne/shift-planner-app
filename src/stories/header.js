import React from "react";
import { storiesOf } from "@storybook/react";

import Icon from "../components/Icon/Icon";
import Header from "../components/Header";

storiesOf("Header", module)
  .add("with left prop", () => (
    <Header
      left={
        <Icon
          name="LockedLock"
          size="xs"
          backgroundColor="#F44336"
          iconColour="#FFFFFF"
        />
      }
    />
  ))
  .add("with center prop", () => (
    <Header center={<div className="text-center">Header</div>} />
  ))
  .add("with right prop", () => (
    <Header
      right={
        <div className="float-right">
          <Icon
            name="Hamburger"
            size="xs"
            backgroundColor="#03A9F4"
            iconColour="#FFFFFF"
          />
        </div>
      }
    />
  ))
  .add("with all slot props", () => (
    <Header
      left={
        <Icon
          name="LockedLock"
          size="xs"
          backgroundColor="#F44336"
          iconColour="#FFFFFF"
        />
      }
      center={<div className="text-center">Header</div>}
      right={
        <div className="float-right">
          <Icon
            name="Hamburger"
            size="xs"
            backgroundColor="#03A9F4"
            iconColour="#FFFFFF"
          />
        </div>
      }
    />
  ));
