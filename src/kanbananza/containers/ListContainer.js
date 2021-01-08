import List from '../components/List';
import { removeList } from '../actions/list-actions';
import { connect } from 'react-redux';

// ownProps, are the properties (props) passed to the container when you ise it
const mapStateToProps = (state, ownProps) => {
  return {
    list: state.lists.entities[ownProps.listId]
  }
}

const mapDispatchToProps = {
  removeList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);