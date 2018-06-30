import { connect } from 'react-redux';
import ItemsList from '../components/ItemsList.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const { itemsList } = state;

  return { itemsList };
};

export default connect(
  mapStateToProps,
  actionCreators,
)(ItemsList);
