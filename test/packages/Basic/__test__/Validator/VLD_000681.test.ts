import { VLD_000681 } from 'basic/components/Form/Validator/VLD_000681';

jest.mock('@/utils/dictFormatMessage', () => {
  return {
    formatMessageApi: () => {
      return 'error_message';
    },
  };
});
describe('VLD_000681', () => {
  test('products is empty', () => {
    const ruleFunc = VLD_000681({
      products: [],
      clientInfoList: [],
      coverageList: [],
      coverageId: '666',
    });
    const callback = jest.fn();
    const rule = {};
    const value = '233';
    ruleFunc(rule, value, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith();
  });
  test('client is insured and not policy owner & wpPbCode is PB insured is PolicyOwner', () => {
    const ruleFunc = VLD_000681({
      products: [
        {
          productCode: 'productCode',
          wpPbCode: 'PB',
        },
      ],
      clientInfoList: [
        {
          id: 'clientId',
          customerRole:['CUS001','CUS002'],
          // roleList: [
          //   {
          //     customerRole: 'CUS001',
          //   },
          //   {
          //     customerRole: 'CUS002',
          //   },
          // ],
        },
      ],
      clientId: 'clientId',
    });
    const callback = jest.fn();
    const rule = {};
    const value = 'productCode';
    ruleFunc(rule, value, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith();
  });
  test('client is insured and not policy owner & wpPbCode is PB insuredNotPolicyOwner', () => {
    const ruleFunc = VLD_000681({
      products: [
        {
          productCode: 'productCode',
          wpPbCode: 'PB',
        },
      ],
      clientInfoList: [
        {
          id: 'clientId',
          customerRole:['CUS001']
          // roleList: [
          //   {
          //     customerRole: 'CUS001',
          //   },
          // ],
        },
      ],
      clientId: 'clientId',
    });
    const callback = jest.fn();
    const rule = {};
    const value = 'productCode';
    ruleFunc(rule, value, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith('error_message');
  });
  test('client is insured and not policy owner & wpPbCode not PB', () => {
    const ruleFunc = VLD_000681({
      products: [
        {
          productCode: 'productCode',
          wpPbCode: 'CCC',
        },
      ],
      clientInfoList: [
        {
          id: 'clientId',
          customerRole:['CUS001']
          // roleList: [
          //   {
          //     customerRole: 'CUS001',
          //   },
          // ],
        },
      ],
      clientId: 'clientId',
    });
    const callback = jest.fn();
    const rule = {};
    const value = 'productCode';
    ruleFunc(rule, value, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith();
  });
});
