import { Component } from "react";
import { connect } from "react-redux";

import { signInAnonymously } from "features/session/actions";

class Auth extends Component {
  componentDidMount() {
    this.props.onSignInAnonymously();
  }

  render() {
    return this.props.children;
  }
}

const mapDispatchToProps = {
  onSignInAnonymously: signInAnonymously
};

export default connect(
  () => ({}),
  mapDispatchToProps
)(Auth);
