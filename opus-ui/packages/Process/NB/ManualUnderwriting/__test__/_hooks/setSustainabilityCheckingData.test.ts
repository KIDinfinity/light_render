import setSustainabilityCheckingData from 'process/NB/ManualUnderwriting/_models/reducers/setSustainabilityCheckingData';

describe('setSustainabilityCheckingData', () => {
  test('apply selected option, when match same version', () => {
    const state = {
      sustainabilityCheckingData: {
        sustainabilityOptions: [
          {
            applied: 'Y',
            optionName: 'RT',
            version: 1,
          },
        ],
      },
    };
    const action = {
      payload: {
        sustainabilityCheckingData: {
          sustainabilityOptions: [
            {
              applied: '',
              optionName: 'RT',
              version: 1,
            },
          ],
        },
      },
    };

    const result = setSustainabilityCheckingData(state, action);

    expect(result).toEqual({
      sustainabilityCheckingData: {
        sustainabilityOptions: [
          {
            applied: 'Y',
            optionName: 'RT',
            version: 1,
          },
        ],
      },
    });
  });

  test('apply selected option, not match same version', () => {
    const state = {
      sustainabilityCheckingData: {
        sustainabilityOptions: [
          {
            applied: 'Y',
            optionName: 'RT',
            version: 1,
          },
        ],
      },
    };
    const action = {
      payload: {
        sustainabilityCheckingData: {
          sustainabilityOptions: [
            {
              applied: null,
              optionName: 'RT',
              version: 2,
            },
          ],
        },
      },
    };

    const result = setSustainabilityCheckingData(state, action);

    expect(result).toEqual({
      sustainabilityCheckingData: {
        sustainabilityOptions: [
          {
            applied: 'N',
            optionName: 'RT',
            version: 2,
          },
        ],
      },
    });
  });
});
