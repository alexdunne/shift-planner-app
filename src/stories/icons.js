import React from "react";
import { storiesOf } from "@storybook/react";

import Icon from "../components/Icons/Icon";
import StoryRow from "../components/StoryRow";

const icons = require.context("../components/Icons", false, /\.js$/);

const storybook = storiesOf("Icons", module);

icons.keys().forEach(filename => {
  const componentName = filename.replace("./", "").replace(".js", "");

  if (!componentName || componentName.trim().length === 0) {
    return;
  }

  const Component = require(`../components/Icons/${componentName}`).default;

  const sizes = ["xs", "sm", "md", "lg", "xl"];

  storybook.add(componentName, () => (
    <div style={{ margin: "0 auto", width: "75%" }}>
      <StoryRow>
        {sizes.map(size => (
          <Icon size={size}>
            <Component />
          </Icon>
        ))}
      </StoryRow>

      <StoryRow>
        {sizes.map(size => (
          <Icon size={size} backgroundColor="#31AD98" iconColour="#FFFFFF">
            <Component />
          </Icon>
        ))}
      </StoryRow>
    </div>
  ));
});
