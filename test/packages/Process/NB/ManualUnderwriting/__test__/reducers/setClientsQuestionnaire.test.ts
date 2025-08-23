import setClientsQuestionnaire from 'process/NB/ManualUnderwriting/_models/reducers/setClientsQuestionnaire';

describe('set clientsQuestionnaire', () => {
  test('data is normal', () => {
    const state = {};
    const action = {
      payload: {
        clientsQuestionnaire: [
          {
            id: 233,
            questionList: [],
          },
        ],
      },
    };
    const result = setClientsQuestionnaire(state, action);
    expect(result).toEqual({
      clientsQuestionnaire: [
        {
          id: 233,
          questionList: [],
        },
      ],
    });
  });
});
