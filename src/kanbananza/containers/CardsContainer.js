import { connect } from 'react-redux';
import Card from '../components/Card';
import { removeCard } from '../actions/card-actions';
import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';

// Lodash memoize, if the same cardId give back the sameSelector
const getListId = memoize(cardId =>
  createSelector(
    state => state.lists.entities,
    lists => {
      console.log('findListIdForCard', lists, cardId);
      for (const [listId, list] of Object.entries(lists)) {
        if (list.cards.includes(cardId)) {
          return listId;
        }
      }
    },
  ),
);

const mapStateToProps = (state, ownProps) => {
  return {
    card: state.cards.entities[ownProps.cardId],
    listId: getListId(ownProps.cardId)(state),
  };
};

export default connect(
  mapStateToProps,
  { removeCard },
)(Card);