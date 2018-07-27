import React from "react";
import { storiesOf } from "@storybook/react";

import Header from "../components/Header";

storiesOf("Header", module)
  .add("no props", () => <Header />)
  .add("with left prop", () => <Header left={<div>left</div>} />);
