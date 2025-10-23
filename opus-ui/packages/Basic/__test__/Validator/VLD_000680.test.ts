import { VLD_000680 } from 'basic/components/Form/Validator/VLD_000680';

jest.mock('@/utils/dictFormatMessage', () => {
  return {
    formatMessageApi: () => {
      return 'error_message';
    },
  };
});
describe('VLD_000680', () => {
  test('products is empty', () => {
    const ruleFunc = VLD_000680({
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
  test('client is insured and not policy owner & lifeCode is PO insured is PolicyOwner', () => {
    const ruleFunc = VLD_000680({
      products: [
        {
          productCode: 'productCode',
          lifeCode: 'PO',
        },
      ],
      clientInfoList: [
        {
          id: 'clientId',
          customerRole:['CUS001','CUS002']
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
      coverageId: '666',
    });
    const callback = jest.fn();
    const rule = {};
    const value = 'productCode';
    ruleFunc(rule, value, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith();
  });
  test('client is insured and not policy owner & lifeCode is PO insuredNotPolicyOwner', () => {
    const ruleFunc = VLD_000680({
      products: [
        {
          productCode: 'productCode',
          lifeCode: 'PO',
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
  test('client is insured and not policy owner & lifeCode not PO', () => {
    const ruleFunc = VLD_000680({
      products: [
        {
          productCode: 'productCode',
          lifeCode: 'CCC',
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
      coverageList: [
        {
          clientId: 'clientId',
          id: '666',
          coreCode: {
            value: 'productCode',
          },
        },
      ],
      coverageId: '666',
    });
    const callback = jest.fn();
    const rule = {};
    const value = 'productCode';
    ruleFunc(rule, value, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith();
  });
});
