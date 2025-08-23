import { VLD_000701 } from 'basic/components/Form/Validator/VLD_000701';

describe('VLD_000701', () => {
  test('The sum of Commission Split% does not equal 100', () => {
    const ruleFunc = VLD_000701({
      agentData: [
        {
          id: '001',
          commissionSplitPercent: 22,
        },
        {
          id: '002',
          commissionSplitPercent: 22,
        },
      ],
      id: '001',
    });
    const callback = jest.fn();
    const rule = {};
    const value = '22';
    ruleFunc(rule, value, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith('Commission Split% must be 100%');
  });
  test('The sum of Commission Split% is equal to 100', () => {
    const ruleFunc = VLD_000701({
      agentData: [
        {
          id: '001',
          commissionSplitPercent: 22,
        },
        {
          id: '002',
          commissionSplitPercent: 78,
        },
      ],
      id: '001',
    });
    const callback = jest.fn();
    const rule = {};
    const value = '22';
    ruleFunc(rule, value, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith();
  });
  test('The Commission Split% is "String"', () => {
    const ruleFunc = VLD_000701({
      agentData: [
        {
          id: '001',
          commissionSplitPercent: '22',
        },
        {
          id: '002',
          commissionSplitPercent: '78',
        },
      ],
      id: '001',
    });
    const callback = jest.fn();
    const rule = {};
    const value = '22';
    ruleFunc(rule, value, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith();
  });
});
