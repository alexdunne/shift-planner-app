import React from "react";
import PropTypes from "prop-types";
import startOfToday from "date-fns/start_of_today";
import { connect } from "react-redux";

import Button from "components/Button";
import { MonthPicker, YearPicker } from "components/Calendar";
import { Container, Row, Col } from "components/Grid";
import ShiftTypeIndicator from "components/ShiftTypeIndicator";
import ShiftTypeEditor from "components/ShiftTypeEditor";
import Toggle from "components/Toggle";
import ShiftMonthOverview from "containers/ShiftMonthOverview";
import { updateShiftForDate } from "features/shifts/actions";
import { updateShiftType } from "features/shiftTypes/actions";
import { getShiftTypesList, getShiftTypesById } from "features/shiftTypes/selectors";

import "./index.css";

class OverviewScreen extends React.Component {
  constructor(props) {
    super(props);

    const today = startOfToday();

    this.state = {
      today,
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      dayHeaders: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      editingShiftTypeId: null
    };
  }

  render() {
    const { month, year, today, editingShiftTypeId } = this.state;
    const { shiftTypesList, shiftTypesById } = this.props;

    const dayHeaders = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const editingShiftType = shiftTypesById[editingShiftTypeId];

    return (
      <React.Fragment>
        <Toggle defaultOn={true}>
          {({ on: locked, onToggle: onToggleLock }) => (
            <section className="overview-screen fill-height">
              <Container className="calendar overview-screen-container">
                <Row className="mb-2">
                  {shiftTypesList.map(shiftType => (
                    <Col key={shiftType.id} span={6} className="mb-2">
                      <ShiftTypeIndicator
                        displayName={shiftType.displayName}
                        color={shiftType.color}
                        onStartEditing={() => this.setState({ editingShiftTypeId: shiftType.id })}
                      />
                    </Col>
                  ))}
                </Row>

                <Row className="mb-4">
                  <Col span={6}>
                    <MonthPicker
                      onChange={({ value }) => {
                        this.setState({ month: value });
                      }}
                      value={month}
                    />
                  </Col>

                  <Col span={6}>
                    <YearPicker
                      onChange={({ value }) => {
                        this.setState({ year: value });
                      }}
                      value={year}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  {dayHeaders.map(day => (
                    <Col key={day}>{day}</Col>
                  ))}
                </Row>

                <Row>
                  <Col className="px-1">
                    <ShiftMonthOverview
                      month={month}
                      year={year}
                      today={today}
                      onDateClicked={(shift, date) => {
                        if (!locked) {
                          this.props.onDateSelected({
                            shift,
                            date,
                            shiftTypesList: this.props.shiftTypesList
                          });
                        }
                      }}
                    />
                  </Col>
                </Row>
              </Container>

              <Button
                style={{ backgroundColor: locked ? "#E4165C" : "#8BC34A" }}
                onClick={onToggleLock}
              >
                {locked ? "Unlock" : "Editing"}
              </Button>
            </section>
          )}
        </Toggle>

        {editingShiftTypeId && (
          <ShiftTypeEditor
            color={editingShiftType.color}
            displayName={editingShiftType.displayName}
            onSave={config => {
              this.props.onUpdateShiftType({ id: editingShiftTypeId, config });
              this.setState({ editingShiftTypeId: null });
            }}
            onCancel={() => this.setState({ editingShiftTypeId: null })}
          />
        )}
      </React.Fragment>
    );
  }
}

OverviewScreen.propTypes = {
  shiftTypesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired,
  shiftTypesById: PropTypes.object.isRequired,
  onDateSelected: PropTypes.func.isRequired,
  onUpdateShiftType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  shiftTypesList: getShiftTypesList(state),
  shiftTypesById: getShiftTypesById(state)
});

const mapDispatchToProps = {
  onDateSelected: updateShiftForDate,
  onUpdateShiftType: updateShiftType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewScreen);
