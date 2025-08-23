import addClientDetail from 'process/NB/ManualUnderwriting/_models/reducers/addClientDetail';

jest.mock("uuid", () => ({
  v4: () => "233",
}));


describe('add client detail', () => {
  it('add item', () => {
    const state = {
      businessData: {
        policyList: [
          {
            clientInfoList: [],
          },
        ],
      },
    };
    const action = {};
    const result = addClientDetail(state, action);
    expect(result).toEqual({
      expendedClient: '',
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: '233',
                isManuallyAdded: 1,
              },
            ],
          },
        ],
      },
    });
  });
});
