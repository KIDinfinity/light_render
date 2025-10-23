import lodash from 'lodash';

export default (incidentListMap: any) => {
  const incidentList = Object.values(incidentListMap || {});
  try {
    if (incidentList.length > 0) {
      return incidentList.reduce((sum: number, i: any) => {
        return (
          (i.klipCaseInfoList?.reduce((acc: any, k: any) => {
            return lodash.isFinite(+k?.lifejRefundPayoutAmount)
              ? +k?.lifejRefundPayoutAmount + acc
              : acc;
          }, 0) || 0) + sum
        );
      }, 0);
    }
    return 0;
  } catch (err) {
    console.log('🚀 ~ file: saveClaimProcessData.ts:21 ~ calPayoutAmount ~ err:', err);
  }
};
