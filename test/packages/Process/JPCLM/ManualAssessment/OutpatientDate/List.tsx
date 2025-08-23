import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import Item from './Item';
import Add from './Add';
import { formUtils } from 'basic/components/Form';

const OutpatientDateList = ({ treatmentId, incidentId }: any) => {
  const groupOpTreatmentList = (opTreatmentList) => {
    const opTreatmentGroupList = lodash
      .chain(opTreatmentList)
      .filter('group')
      .orderBy((item) => moment(item.outpatientTreatmentDate).valueOf(), ['asc'])
      .groupBy('group')
      .map((item) => {
        const newItem = {
          diagnosisIdList: item[0].diagnosisIdList,
          outpatientDateList: [],
          group: item[0].group,
        };
        lodash.forEach(item, (date) => {
          newItem.outpatientDateList.push(date.outpatientTreatmentDate);
        });
        return newItem;
      })
      .value();
    return opTreatmentGroupList;
  };

  const diagnosisListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimEntities.diagnosisListMap
  );

  const incidentDiagnosisIdList =
    useSelector(
      ({ JPCLMOfClaimAssessment }: any) =>
        JPCLMOfClaimAssessment.claimEntities.incidentListMap?.[incidentId]?.diagnosisList
    ) || [];

  const diagnosisList =
    lodash.filter(
      diagnosisListMap,
      (dictionasis) =>
        lodash.some(incidentDiagnosisIdList, (id) => id === dictionasis.id) &&
        formUtils.queryValue(dictionasis.diagnosisName) &&
        formUtils.queryValue(dictionasis.diagnosisName) !== ''
    ) || [];

  const opTreatmentListObj = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList
  );

  const opTreatmentGroupList = groupOpTreatmentList(opTreatmentListObj);

  return (
    <div>
      {lodash.map(opTreatmentGroupList, (item, index) => {
        return (
          <Item
            diagnosisIdList={item.diagnosisIdList || []}
            outpatientDateList={item.outpatientDateList || []}
            group={item.group}
            key={index}
            treatmentId={treatmentId}
            incidentId={incidentId}
          />
        );
      })}
      {lodash.size(diagnosisList) > 0 && <Add treatmentId={treatmentId} incidentId={incidentId} />}
    </div>
  );
};

export default OutpatientDateList;
