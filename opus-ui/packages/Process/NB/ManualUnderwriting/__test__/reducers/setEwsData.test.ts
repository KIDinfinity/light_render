import setEwsData from 'process/NB/ManualUnderwriting/_models/reducers/setEwsData';

describe('test set ews data', () => {
  test('data normalization', () => {
    const state = {};
    const action = {
      payload: {
        ewsData: [
          {
            id: '233',
          },
        ],
      },
    };
    const result = setEwsData(state, action);
    expect(result).toEqual({
      ewsData: [
        {
          id: '233',
        },
      ],
    });
  });
});
