import React from "react";
import { storiesOf } from "@storybook/react";
import { withState } from "@dump247/storybook-state";

import { Container, Row, Col } from "../components/Grid";
import Planner from "../components/Planner";

const now = new Date();

storiesOf("Planner", module).add(
  "Planner",
  withState({ month: now.getMonth() + 1, year: now.getFullYear() })(
    ({ store }) => (
      <Container>
        <Row>
          <Col>
            <input
              type="number"
              value={store.state.month}
              onChange={event =>
                store.set({ month: parseInt(event.target.value, 10) })
              }
            />
          </Col>
          <Col>
            <input
              type="number"
              value={store.state.year}
              onChange={event =>
                store.set({ year: parseInt(event.target.value, 10) })
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Planner month={store.state.month} year={store.state.year} />
          </Col>
        </Row>
      </Container>
    )
  )
);
