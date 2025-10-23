import setChequeInfo from 'process/NB/Share/models/reducers/setChequeInfo';

describe('setChequeInfo', () => {
  test('change value', () => {
    const state = {
      chequeInfoList: [
        {
          id: '233',
          chequeAllocationAmount: 55,
        },
        {
          id: '334',
          chequeAllocationAmount: 66,
        },
      ],
    };

    const action = {
      payload: {
        id: '233',
        changedFields: {
          chequeAllocationAmount: 99,
        },
      },
    };
    const result = setChequeInfo(state, action);

    expect(result).toEqual({
      chequeInfoList: [
        {
          id: '233',
          chequeAllocationAmount: 99,
        },
        {
          id: '334',
          chequeAllocationAmount: 66,
        },
      ],
    });
  });
});
