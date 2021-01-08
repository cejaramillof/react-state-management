import { lists as defaultLists } from '../normalized-state';
import set from 'lodash/fp/set';
import { addIdToChildren, addEntity, removeIdFromChildren, removeEntity } from './_utilities';
import { LIST_CREATE, LIST_DELETE } from '../actions/list-actions';
import { CARD_MOVE, CARD_CREATE, CARD_DELETE } from '../actions/card-actions';



// lists too be called state
const listsReducer = (lists = defaultLists, action) => {
  console.log(lists, action);
  if (action.type === CARD_CREATE) {
    const { cardId, listId } = action.payload;
    return addIdToChildren(lists, listId, 'cards', cardId);

    const entities = { ...lists.entities }
    const cards = lists.entities[listId].cards.concat(cardId);

    // set(chainOfProperties, whatYouWantToReplace, TheObject)
    return set(['entities', listId, 'cards'], cards, lists);

    entities[listId] = {
      ...entities[listId],
      cards: entities[listId].cards.concat(cardId),
    }

    return {
      ...lists,
      entities
    }
  }

  if (action.type === CARD_DELETE) {
    const { cardId, listId } = action.payload;
    return removeIdFromChildren(lists, listId, 'cards', cardId);
  }

  if (action.type === LIST_CREATE) {
    const { list, listId } = action.payload;
    return addEntity(lists, list, listId);
  }

  if (action.type === LIST_DELETE) {
    const { listId } = action.payload;
    return removeEntity(lists, listId);
  }

  if (action.type === CARD_MOVE) {
    const { cardId, originListId, destinationListId } = action.payload;
    let newState = removeIdFromChildren(lists, originListId, 'cards', cardId);
    return addIdToChildren(newState, destinationListId, 'cards', cardId);
  }

  return lists;
}

export default listsReducer;