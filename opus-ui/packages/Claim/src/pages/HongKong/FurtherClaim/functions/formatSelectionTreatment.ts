import lodash from 'lodash';

/**
 * 获取selection treatment关键信息
 * @param selectionTreatments
 * @returns
 */
export const formatSelectionTreatment = (selectionTreatments: any[]) => {
  const compareRule = ['claimNo', 'treatmentId', 'relaClaimNo', 'relaTreatmentId', 'followUp'];

  return lodash
    .chain(selectionTreatments)
    .map((item) => {
      const target: any = lodash.pick(item, compareRule);
      return {
        ...target,
        order: `${target?.claimNo}${target?.treatmentId}${target?.relaClaimNo}${target?.relaTreatmentId}`,
      };
    })
    .orderBy('order')
    .compact()
    .value();
};
