import { connect } from 'react-redux';
import CreateCard from '../components/CreateCard';
import { createCard } from '../actions/card-actions';

const defaultCardData = {
  title: '',
  description: '',
  assignedTo: '',
}

// Moved this logic to action creator
const mapDispatchToPropsOld = (dispatch, ownProps) => {
  // if you use ownProps, you have to do it, in this function
  return {
    createCard(listId, cardData) {
      const cardId = Date.now().toString();
      const card = {
        id: cardId,
        ...defaultCardData,
        ...cardData,
      }
      dispatch({
        type: 'CARD_CREATE',
        payload: { card, listId, cardId },
      })
    }
  }
}

const mapDispatchToProps = {
  createCard
}

export default connect(
  null,
  mapDispatchToProps // { createCard } or can use this, without variable
)(CreateCard);