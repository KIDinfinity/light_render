import { produce }  from 'immer';
import lodash from 'lodash';
import moment from 'moment';

const timeIn = (referData: any, compactData: any) => {
  const startData = lodash.isArray(compactData) ? compactData[0] : compactData;
  const endData = lodash.isArray(compactData) ? compactData[1] : compactData;

  return (
    moment(startData).diff(moment(referData[0]), 'days') > 0 &&
    moment(endData).diff(moment(referData[1]), 'days') < 0
  );
};

const saveSerialClaimFilterList = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const serialClaim = draftState?.serialClaim || {};

    const filterParams = lodash
      .chain(serialClaim.filterParams)
      .keys()
      .reduce((obj: any, key: any) => {
        if (!!serialClaim.filterParams[key]) {
          return { ...obj, [key]: serialClaim.filterParams[key] };
        }
        return obj;
      }, {})
      .pick([
        'diagnosisName',
        'causeOfIncident',
        'claimType',
        'treatmentType',
        'policyNo',
        'hospitalizationSequentialNo',
      ])
      .value();

    draftState.serialClaim.filterList = lodash
      .chain(serialClaim.allList)
      .filter({
        ...filterParams,
      })
      .filter((el: any) => {
        if (!lodash.isEmpty(serialClaim.filterParams.times)) {
          return el.treatmentType === 'IP'
            ? timeIn(serialClaim.filterParams.times, [el.dateOfAdmission, el.dateOfDischarge])
            : timeIn(serialClaim.filterParams.times, el.dateOfConsultation);
        }
        return true;
      })
      .value();
  });

  return { ...nextState };
};

export default saveSerialClaimFilterList;
