import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Icon from "../components/Icon/Icon";
import StoryRow from "../components/StoryRow";

const icons = require.context("../components/Icon", false, /\.js$/);

const storybook = storiesOf("Icons", module);

icons.keys().forEach(filename => {
  const componentName = filename.replace("./", "").replace(".js", "");

  if (
    !componentName ||
    componentName.trim().length === 0 ||
    componentName === "Icon"
  ) {
    return;
  }

  const Component = require(`../components/Icon/${componentName}`).default;

  const sizes = ["xs", "sm", "md", "lg", "xl"];

  storybook.add(componentName, () => (
    <div style={{ margin: "0 auto", width: "75%" }}>
      <StoryRow>
        {sizes.map(size => (
          <Icon name={componentName} size={size} onPress={action("Pressed")} />
        ))}
      </StoryRow>

      <StoryRow>
        {sizes.map(size => (
          <Icon
            name={componentName}
            size={size}
            backgroundColor="#31AD98"
            iconColour="#FFFFFF"
            onPress={action("Pressed")}
          >
            <Component />
          </Icon>
        ))}
      </StoryRow>
    </div>
  ));
});
