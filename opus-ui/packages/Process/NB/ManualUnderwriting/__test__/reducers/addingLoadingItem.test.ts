import addingLoadingItem from 'process/NB/ManualUnderwriting/_models/reducers/addingLoadingItem';

jest.mock("uuid", () => ({
  v4: () => "mock-uuid",
}));


describe('addingLoadingItem', () => {
  test('to add item', () => {
    const state = {
      addingLoadingItems: [
        {
          id: 'exist-id',
          loadingFunctionType: "UA",
        },
      ],
    };
    const action = {};
    const result = addingLoadingItem(state, action);
    expect(result).toEqual({
      addingLoadingItems: [
        {
          id: 'exist-id',
          loadingFunctionType: "UA",
        },
        {
          id: 'mock-uuid',
          loadingFunctionType: "UA",
        },
      ],
    });
  });
});
