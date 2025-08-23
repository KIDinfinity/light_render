import transLoadingData from 'process/NB/ManualUnderwriting/utils/transLoadingData';

describe('packages/Process/NB/ManualUnderwriting/utils/transLoadingData.ts', () => {
  test('value is object', () => {
    const item = {
      extraMortality: 55,
      flatMortality: 666,
      pmLoading: 100,
    };
    const result = transLoadingData({
      item,
    });

    expect(result).toEqual({
      extraMortality: '55',
      flatMortality: '666',
      pmLoading: '100',
    });
  });

  test('item is null', () => {
    const item = null;
    const reuslt = transLoadingData({
      item,
    });
    expect(reuslt).toEqual({});
  });

  test('value is object', () => {
    const item = {
      pmLoading: {
        value: 100,
      },
    };
    const result = transLoadingData({
      item,
    });
    expect(result).toEqual({
      pmLoading: {
        value: '100',
      },
    });
  });
});
