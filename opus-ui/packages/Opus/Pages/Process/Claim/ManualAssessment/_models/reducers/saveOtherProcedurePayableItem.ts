import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { cleanClaimDecisionError } from '../functions/validateClaimDecision';
import { updateDuplicatePayableError } from '../functions';
import moment from 'moment';

const Link = {
  benefitItemCode: ({ draftState, payableItem }: any) => {
    updateDuplicatePayableError(
      draftState,
      {
        editPayable: formUtils.cleanValidateData(payableItem),
        benefitItemCode: formUtils.queryValue(payableItem?.preBenefitItemCode),
      },
      'otherProcedurePayable'
    );
  },
  assessorOverrideAmount: ({ draftState, payableItem, id }: any) => {
    cleanClaimDecisionError(draftState, payableItem);
    const value = formUtils.queryValue(payableItem?.assessorOverrideAmount);
    draftState.claimEntities.otherProcedurePayableListMap[id].payableAmount = lodash.isNumber(value)
      ? value
      : draftState?.claimEntities?.otherProcedurePayableListMap?.[id]?.systemCalculationAmount;
  },
  radioDateList: ({ draftState, payableItem, id, changedFields }: any) => {
    draftState.claimEntities.otherProcedurePayableListMap[id].radioDateList = lodash.map(
      formUtils.queryValue(changedFields.radioDateList),
      (item) => moment(item).valueOf()
    );
  },
  multiReasonDates: ({ draftState, payableItem, id, changedFields }: any) => {
    draftState.claimEntities.otherProcedurePayableListMap[id].multiReasonDates = `[${lodash
      .map(formUtils.queryValue(changedFields.multiReasonDates), (item) => moment(item).valueOf())
      .join(',')}]`;
  },
};

const saveOtherProcedurePayableItem = (state: any, action: any) => {
  const { id, changedFields, changeRadioDateList = false } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const payableItem = draftState.claimEntities?.otherProcedurePayableListMap?.[id] || {};

    const finishItem = {
      ...payableItem,
      ...changedFields,
      radioDateList:
        // 是为了解决提交的时候转化为Date格式
        lodash.size(changedFields) > 1
          ? lodash.map(formUtils.queryValue(changedFields.radioDateList), (item) =>
              moment(item).valueOf()
            )
          : payableItem.radioDateList,
    };
    draftState.claimEntities.otherProcedurePayableListMap[id] = finishItem;

    if (
      lodash.size(changedFields) > 1 ||
      (!changeRadioDateList &&
        lodash.size(changedFields) === 1 &&
        lodash.has(changedFields, 'radioDateList'))
    )
      return;

    lodash.isFunction(Link[lodash.keys(changedFields)[0]]) &&
      Link[lodash.keys(changedFields)[0]]({
        draftState,
        payableItem: finishItem,
        changedFields,
        id,
      });
  });

  return { ...nextState };
};

export default saveOtherProcedurePayableItem;
