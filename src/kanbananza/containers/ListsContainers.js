import Lists from '../components/Lists'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    lists: state.lists.ids
  }
}

export default connect(mapStateToProps)(Lists);