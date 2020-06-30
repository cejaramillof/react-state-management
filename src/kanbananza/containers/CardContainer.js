import { connect } from 'react-redux';
import Card from '../components/Card';

// ownProps, are the properties (props) passed to the container when you ise it
const mapStateToProps = (state, ownProps) => {
  return {
    card: state.cards.entities[ownProps.cardId]
  }
}

export default connect(mapStateToProps)(Card);