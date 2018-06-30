import { connect } from 'react-redux';
import Errors from '../components/Errors.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const { errors } = state;

  return { errors };
};

export default connect(
  mapStateToProps,
  actionCreators,
)(Errors);
