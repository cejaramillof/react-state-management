import List from '../components/List';
import { connect } from 'react-redux';

// ownProps, are the properties (props) passed to the container when you ise it
const mapStateToProps = (state, ownProps) => {
  return {
    list: state.lists.entities[ownProps.listId]
  }
}

export default connect(mapStateToProps)(List);