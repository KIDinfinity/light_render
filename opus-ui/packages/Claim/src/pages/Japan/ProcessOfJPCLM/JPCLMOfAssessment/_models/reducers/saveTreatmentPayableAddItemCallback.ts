/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { isArray } from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { PolicySetupStatus } from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';
import { checkTreatmentPayableForNoImplement } from '../functions/teatmentPayableIsExist';
import findCurIncidentPayable from '../functions/findCurIncidentPayable';
import { updateDecisionForTreatmentPayableItem } from '../functions/expectDecisionFunc';

const setTreatmentPayable = ({
  treatmentPayableAddItem,
  claimPayableListMap,
  treatmentPayableListMap,
  claimProcessData,
  curIncidentPayable,
}) => {
  const { id } = curIncidentPayable;
  treatmentPayableAddItem.payableId = id;
  if (isArray(claimPayableListMap[id].treatmentPayableList)) {
    claimPayableListMap[id].treatmentPayableList.push(treatmentPayableAddItem.id);
  } else {
    claimPayableListMap[id].treatmentPayableList = [treatmentPayableAddItem.id];
  }

  treatmentPayableListMap[treatmentPayableAddItem.id] = treatmentPayableAddItem;
  updateDecisionForTreatmentPayableItem(
    claimProcessData,
    curIncidentPayable,
    treatmentPayableAddItem
  );
};

const saveTreatmentPayableAddItemCallback = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { claimEntities, claimProcessData, treatmentPayableAddItem } = draftState;

    if (!formUtils.queryValue(treatmentPayableAddItem.benefitTypeCode)) {
      return {
        ...state,
      };
    }
    const { claimPayableListMap, treatmentPayableListMap } = claimEntities;
    const curIncidentPayable = findCurIncidentPayable(
      claimPayableListMap,
      formUtils.cleanValidateData(treatmentPayableAddItem)
    );
    // 如果当前的保单过滤后只有一条incidentPayable数据
    if (curIncidentPayable) {
      const { policySetupStatus, treatmentPayableList } = curIncidentPayable;
      treatmentPayableAddItem.policySetupStatus = policySetupStatus;
      const treatmentPayableListIds = treatmentPayableList;
      if (policySetupStatus === PolicySetupStatus.NoImplement) {
        const result = checkTreatmentPayableForNoImplement(
          treatmentPayableListMap,
          treatmentPayableListIds,
          treatmentPayableAddItem
        );
        if (!result) {
          setTreatmentPayable({
            treatmentPayableAddItem,
            claimPayableListMap,
            treatmentPayableListMap,
            claimProcessData,
            curIncidentPayable,
          });
          draftState.treatmentPayableAddItem = null;
        } else {
          treatmentPayableAddItem.productCode = {
            ...treatmentPayableAddItem.productCode,
            errors: [
              {
                message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }),
                field: 'productCode',
              },
            ],
          };
        }
      } else if (formUtils.queryValue(treatmentPayableAddItem.benefitItemCode)) {
        setTreatmentPayable({
          treatmentPayableAddItem,
          claimPayableListMap,
          treatmentPayableListMap,
          claimProcessData,
          curIncidentPayable,
        });
        draftState.treatmentPayableAddItem = null;
      }
    }
  });

  return { ...nextState };
};

export default saveTreatmentPayableAddItemCallback;
