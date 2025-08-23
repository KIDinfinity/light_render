import updateTargetApplicationNo from 'process/NB/ManualUnderwriting/_models/reducers/updateTargetApplicationNo';

describe('updateTargetApplicationNo', () => {
  test('set application no ', () => {
    const state = {
      businessData: {
        policyList: [
          {
            id: 'policy',
            premiumTransferList: [
              {
                id: '666',
                targetPolicyId: '122',
              },
              {
                id: '233',
                targetPolicyId: '555',
              },
            ],
          },
        ],
      },
    };
    const action = {
      payload: {
        targetApplicationNo: 'gg',
        policyNo: '555',
      },
    };
    const result = updateTargetApplicationNo(state, action);

    expect(result).toEqual({
      businessData: {
        policyList: [
          {
            id: 'policy',
            premiumTransferList: [
              {
                id: '666',
                targetPolicyId: '122',
              },
              {
                id: '233',
                targetApplicationNo: 'gg',
                targetPolicyId: '555',
              },
            ],
          },
        ],
      },
    });
  });
});
