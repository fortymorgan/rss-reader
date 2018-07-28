import { connect } from 'react-redux';
import FeedsList from '../components/FeedsList.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const { feedsList, itemsList } = state;

  return { feedsList: Object.values(feedsList), itemsList };
};

export default connect(
  mapStateToProps,
  actionCreators,
)(FeedsList);
