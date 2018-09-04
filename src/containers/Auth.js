import { Component } from "react";
import { connect } from "react-redux";

import { signInAnonymously } from "features/session/actions";

class Auth extends Component {
  componentDidMount() {
    this.props.onSignInAnonymously();
  }

  render() {
    if (this.props.session.isSigningIn) {
      return null;
    }

    return this.props.children;
  }
}

const mapStateToProps = state => ({
  session: state.session
});

const mapDispatchToProps = {
  onSignInAnonymously: signInAnonymously
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
