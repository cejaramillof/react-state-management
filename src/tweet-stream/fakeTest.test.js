it('fetches items from the database', () => {
  const itemsInDatabase = {
    items: [{ id: 1, value: 'Cheese', packed: false}],
  };

  // need mock fetch api
  // because you can't separate the dispatching of that function from the execution of it.
  fetchMock.getOnce('/items', [{
    body: itemsInDatabase,
    headers: { 'content-type': 'applciation/json' },
  }]);

  const store = mockStore({ items: [] });

  return store.dispatch(actions.getItems()).then(() => {
    expect(store.getItems()).toEqual({
      type: GET_ALL_ITEMS,
      items: itemsInDatabase
    })
  })
})