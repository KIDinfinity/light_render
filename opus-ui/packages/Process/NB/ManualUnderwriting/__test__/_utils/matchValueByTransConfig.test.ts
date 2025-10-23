import { matchValue } from 'process/NB/ManualUnderwriting/utils/matchValueByTransConfig';

describe('matchValue', () => {
  test('dataSoureParamType is not exist', () => {
    const result = matchValue({
      mappingItem: {
        name: '233',
      },
      targetParam: 'name',
    });
    expect(result).toEqual('233');
  });
  test('dataSoureParamType is single', () => {
    const result = matchValue({
      mappingItem: {
        name: 'gg',
        age: '23',
      },
      targetParam: 'name',
      dataSoureParamType: 'single',
    });
    expect(result).toEqual('gg');
  });
});

describe('matchValueByTransConfig', () => {});
