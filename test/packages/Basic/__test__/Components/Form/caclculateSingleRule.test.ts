import { caclculateSingleRule } from 'basic/components/Form/Rule';

describe('caclculateSingleRule', () => {
  test('empty ', () => {
    const result = caclculateSingleRule({
      left: 0,
      operator: 'empty',
    });
    expect(result).toBeTruthy();
  });

  test('not empty  testing  value is number', () => {
    const result = caclculateSingleRule({
      left: 100,
      operator: 'not empty',
    });
    expect(result).toBeTruthy();
  });

  test('not empty  testing  value is empty array', () => {
    const result = caclculateSingleRule({
      left: [],
      operator: 'not empty',
    });
    expect(result).not.toBeTruthy();
  });

  test('not empty  testing  value not a empty array', () => {
    const result = caclculateSingleRule({
      left: [1],
      operator: 'not empty',
    });
    expect(result).toBeTruthy();
  });

  test('not empty  testing  value is a empty object', () => {
    const result = caclculateSingleRule({
      left: {},
      operator: 'not empty',
    });
    expect(result).not.toBeTruthy();
  });

  test('not empty  testing  value not a empty object', () => {
    const result = caclculateSingleRule({
      left: {
        test: true,
      },
      operator: 'not empty',
    });
    expect(result).toBeTruthy();
  });
});
