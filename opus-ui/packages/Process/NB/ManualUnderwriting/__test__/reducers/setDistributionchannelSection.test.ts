import setDistributionchannelSection from 'process/NB/ManualUnderwriting/_models/reducers/setDistributionchannelSection';

describe('setDistributionchannelSection', () => {
  test('primary agent type is exist', () => {
    const state = {
      businessData: {
        agentList: [
          {
            id:'001',
            agentType: 'P',
            agentName: 'test',
          },
        ],
      },
      stepsChange: {
        OtherInfo: false,
      },
    };
    const action = {
      payload: {
        changedFields: {
          agentName: {
            value: 'changed',
          },
        },
        id:'001',
      },
    };
    const result = setDistributionchannelSection(state, action);
    expect(result).toEqual({
      stepsChange: {
        OtherInfo: true,
      },
      businessData: {
        agentList: [
          {
            id:'001',
            agentType: 'P',
            agentName: {
              value: 'changed',
            },
          },
        ],
      },
    });
  });
  test('primary agent type is not exist', () => {
    const state = {
      businessData: {
        agentList: [
          {
            id:'002',
            agentType: 'S',
            agentName: 'test',
          },
        ],
      },
      stepsChange: {
        OtherInfo: false,
      },
    };
    const action = {
      payload: {
        changedFields: {
          agentName: {
            value: 'changed',
          },
        },
      },
    };
    const result = setDistributionchannelSection(state, action);
    expect(result).toEqual({
      stepsChange: {
        OtherInfo: true,
      },
      businessData: {
        agentList: [
          {
            id:'002',
            agentType: 'S',
            agentName: 'test',
          },
        ],
      },
    });
  });
});
