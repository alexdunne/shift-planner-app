import React from "react";
import { storiesOf } from "@storybook/react";
import { withState } from "@dump247/storybook-state";

import AppHeader from "components/AppHeader";

storiesOf("AppHeader", module).add(
  "Toggle lock",
  withState({ locked: true })(({ store }) => (
    <AppHeader {...store.state} onToggleLocked={() => store.set({ locked: !store.state.locked })} />
  ))
);
