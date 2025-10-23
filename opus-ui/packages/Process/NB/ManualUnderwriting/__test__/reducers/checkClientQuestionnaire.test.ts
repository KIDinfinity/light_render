import checkClientQuestionnaire from 'process/NB/ManualUnderwriting/_models/reducers/checkClientQuestionnaire';

describe('set client id', () => {
  test('set client id ', () => {
    const state = {};
    const action = {
      payload: {
        selectedClientId: '233',
      },
    };
    const result = checkClientQuestionnaire(state, action);
    expect(result).toEqual({
      selectedClientId: '233',
    });
  });
});
