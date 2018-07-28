import { connect } from 'react-redux';
import InputForm from '../components/InputForm.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const {
    validInput,
    input,
    feedsList,
    nextId,
  } = state;

  return {
    validInput,
    input,
    feedsList: Object.values(feedsList),
    nextId,
  };
};

export default connect(
  mapStateToProps,
  actionCreators,
)(InputForm);
