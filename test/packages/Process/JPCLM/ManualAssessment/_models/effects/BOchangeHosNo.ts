import lodash from 'lodash';
import moment from 'moment';
import { changeSeqNo } from '@/services/claimJpLifejBoControllerService';
import { notification } from 'antd';
import { formUtils } from 'basic/components/Form';
import handleMessageModal from '@/utils/commonMessage';

const getMomentDate = (date: any) => moment(date).format('YYYY/MM/DD');

export default function* BOchangeHosNo(_: any, { call, select }: any) {
  // @ts-ignore
  const {
    treatmentPayableListMap,
    treatmentListMap,
    procedureListMap,
    procedurePayableListMap,
    opTreatmentPayableListMap,
  } = yield select(
    (state: any) => formUtils.cleanValidateData(state.JPCLMOfClaimAssessment.claimEntities) || {}
  );

  const adjTreatmentPayableList = lodash
    .chain(lodash.values(treatmentPayableListMap) || [])
    .filter((el: any) => el.isAdjustment)
    .value();

  const changedSeqNoPayableList = lodash
    .chain(adjTreatmentPayableList)
    .reduce((arr: any, treatmentPayableItem: any) => {
      // OP
      if (
        !!treatmentPayableItem.benefitSubCategory &&
        treatmentPayableItem.benefitSubCategory === 'OP'
      ) {
        return lodash.filter(
          lodash.values(opTreatmentPayableListMap) || [],
          (el: any) => el.treatmentPayableId === treatmentPayableItem.id && el.reversalFlag === 'Y'
        );
      }

      if (treatmentPayableItem.payableAmount < 0) {
        // SG
        if (!lodash.isEmpty(treatmentPayableItem.procedurePayableList)) {
          const procedurePayableList = lodash.filter(
            lodash.values(procedurePayableListMap) || [],
            (el: any) => el.treatmentPayableId === treatmentPayableItem.id
          );

          return lodash.reduce(
            procedurePayableList,
            (opTreatmentPayableArr: any, opTreatmentPayableItem: any) => {
              if (opTreatmentPayableItem.payableAmount < 0) {
                const changePayableItem = lodash.find(
                  procedurePayableList,
                  (el: any) =>
                    getMomentDate(el?.dateOfConsultation) ===
                      getMomentDate(opTreatmentPayableItem.dateOfConsultation) &&
                    el.payableAmount > 0
                );
                if (!!changePayableItem) {
                  return [...arr, changePayableItem];
                }
                return arr;
              }
              return arr;
            },
            []
          );
        } else {
          // IP
          const changePayableItem = lodash
            .chain(adjTreatmentPayableList)
            .filter({
              ...lodash.pick(treatmentPayableItem, [
                'policyNo',
                'productCode',
                'productPlan',
                'benefitItemCode',
                'benefitTypeCode',
              ]),
            })
            .find((el: any) => el.payableAmount > 0)
            .value();

          if (!!changePayableItem) {
            return [...arr, changePayableItem];
          }
        }

        return arr;
      }

      return arr;
    }, [])
    .map((el: any) => ({
      ...el,
      originClaimNo:
        treatmentListMap?.[el.treatmentId]?.originClaimNo ||
        procedureListMap?.[el.procedureId]?.originClaimNo,
    }))
    .value();

  if (changedSeqNoPayableList.length > 0) {
    const response = yield call(changeSeqNo, [...changedSeqNoPayableList]);

    if (response?.success) {
      // TODO:把成功状态存储到sna里面

      notification.success({
        message: 'Change Hospitalization Number successfully!',
      });
    } else {
      handleMessageModal(response?.promptMessages);
    }

    return response;
  }
}
