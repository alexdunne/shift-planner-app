import React from "react";
import { storiesOf } from "@storybook/react";

import Planner from "../components/Planner";

storiesOf("Planner", module).add("Planner", () => (
  <Planner month={7} year={2018} />
));
