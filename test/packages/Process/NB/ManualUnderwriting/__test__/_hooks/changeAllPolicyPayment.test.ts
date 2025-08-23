import changeAllPolicyPayment from 'process/NB/ManualUnderwriting/_models/reducers/changeAllPolicyPayment';

jest.mock('basic/components/Form', () => {
  return {
    formUtils: {
      queryValue: (field) => {
        return field?.value || field;
      },
    },
  };
});
describe('changeAllPolicyPayment', () => {
  test('change paymentMode', () => {
    const state = {
      businessData: {
        policyList: [
          {
            id: 'policyId',
            paymentList: [
              {
                policyPayMode: 'S',
              },
              {
                policyPayMode: 'M',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        policyPayMode: 'G',
      },
    };
    const result = changeAllPolicyPayment(state, action);

    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            id: 'policyId',
            paymentList: [
              {
                policyPayMode: 'G',
              },
              {
                policyPayMode: 'G',
              },
            ],
          },
        ],
      },
    });
  });
});
