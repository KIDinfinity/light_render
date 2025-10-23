import { VLD_000721 } from 'basic/components/Form/Validator/VLD_000721';

jest.mock('@/utils/dictFormatMessage', () => {
  return {
    formatMessageApi: () => {
      return 'error_message';
    },
  };
});

describe('VLD_000721', () => {
  // 后端配置数据，当新增1.32时，需要['1.30', '1.33', '1.41', '1.50']的 payableAmount 之和不小于 remainAmount
  const listPerConfinementLimit = [
    {
      benefitTypeCode: 'RHMA30A',
      benefitItemCode: '1.30',
      limitKey: 'share_amount_per_confinement_limit',
      remainAmount: 10,
      rolloverBenefitTypeCode: 'RHMA30A',
      rolloverBenefitItemCode: '1.32',
      shareBenefitItemCodeList: ['1.33', '1.41', '1.50'],
    },
  ];
  const parentPayableId = 'f1715ce4-bdd4-4c69-9d96-7a29eb242f59';

  // 当新增1.32时,benefitTypeCode 包含['1.30', '1.33', '1.41', '1.50']的 payableAmount 和不小于 remainAmount
  const childPayableListMap = {
    'c1dbce0d-96fb-4316-8aa7-2c09cdaa0c24': {
      invoicePayableId: parentPayableId,
      payableAmount: 1,
      benefitTypeCode: 'RHMA30A',
      benefitItemCode: '1.30',
    },
    '01026da2-10af-469f-b9a9-ba0ed9f18a26': {
      invoicePayableId: parentPayableId,
      payableAmount: 12,
      benefitTypeCode: 'RHMA30A',
      benefitItemCode: '1.10',
    },
  };

  // 当新增1.32时,benefitTypeCode 包含['1.30', '1.33', '1.41', '1.50']的 payableAmount 和不小于 remainAmount
  const childPayableListMapPass = {
    'c1dbce0d-96fb-4316-8aa7-2c09cdaa0c24': {
      invoicePayableId: parentPayableId,
      payableAmount: 10,
      benefitTypeCode: 'RHMA30A',
      benefitItemCode: '1.33',
    },
    '01026da2-10af-469f-b9a9-ba0ed9f18a26': {
      invoicePayableId: parentPayableId,
      payableAmount: 12,
      benefitTypeCode: 'RHMA30A',
      benefitItemCode: '1.10',
    },
  };

  test('校验报错，新增的benefitItemCode不符合新增条件 ', () => {
    const ruleFunc = VLD_000721({
      listPerConfinementLimit,
      parentPayableId,
      childPayableListMap,
    });
    const callback = jest.fn();
    const rule = {};
    const value = '1.32';
    ruleFunc(rule, value, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith('error_message');
  });

  test('通过校验', () => {
    const ruleFunc = VLD_000721({
      listPerConfinementLimit,
      parentPayableId,
      childPayableListMap: childPayableListMapPass,
    });
    const callback = jest.fn();
    const rule = {};
    const value = '1.32';
    ruleFunc(rule, value, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith();
  });
});
