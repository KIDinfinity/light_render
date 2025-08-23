import lodash from 'lodash';
/**
 * 获取影响受益人分配结果的claim payable数据以供对比
 * @param claimPayables claim payable数据
 */
const getClaimPayableCompare = (claimPayables: any[]) => {
  if (lodash.isEmpty(claimPayables)) return [];
  const monitorFields: string[] = [
    'policyNo',
    'productCode',
    'benefitTypeCode',
    'payableAmount',
    'claimDecision',
  ];

  return lodash
    .chain(claimPayables)
    .map((data: any) => {
      if (!lodash.isPlainObject(data)) return null;
      return lodash.pick(data, monitorFields);
    })
    .compact()
    .value();
};

export default getClaimPayableCompare;
