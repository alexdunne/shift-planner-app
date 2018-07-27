import React from "react";
import { storiesOf } from "@storybook/react";

import AppHeader from "../components/AppHeader";

storiesOf("AppHeader", module)
  .add("locked", () => <AppHeader locked={true} />)
  .add("unlocked", () => <AppHeader locked={false} />);
