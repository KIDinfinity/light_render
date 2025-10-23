import updateClientsByDedupcheck from 'process/NB/ManualUnderwriting/_models/reducers/updateClientsByDedupcheck';

describe('updateClientsByDedupcheck', () => {
  test('match item', () => {
    const state = {
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 'targe-id',
                name: 'target',
              },
              { id: 'not-change', name: 'not-change-name' },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        customerIndentificationData: {
          policyList: [
            {
              clientInfoList: [
                {
                  id: 'targe-id',
                  name: 'target-change',
                  age: 666,
                },
              ],
            },
          ],
        },
      },
    };
    const result = updateClientsByDedupcheck(state, action);
    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            clientInfoList: [
              {
                id: 'targe-id',
                name: 'target-change',
                age: 666,
              },
              { id: 'not-change', name: 'not-change-name' },
            ],
          },
        ],
      },
    });
  });
});
