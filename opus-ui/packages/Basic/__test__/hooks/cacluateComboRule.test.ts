import { cacluateComboRule } from 'basic/components/Form/Rule';

describe('cacluateComboRule', () => {
  test('test combo', () => {
    const result = cacluateComboRule({
      conditions: [
        { left: 300, operator: 'empty', right: undefined },
        { left: null, operator: 'empty', right: undefined },
      ],
      combine: '&&',
    });
    expect(result).not.toBeTruthy();
  });
});
