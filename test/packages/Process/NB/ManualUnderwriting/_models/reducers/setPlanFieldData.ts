import { produce }  from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import { extraDataSrouce } from 'process/NB/ManualUnderwriting/_hooks/data.trans.config';
import changeBasicInfoFields from './changeBasicInfoFields';
import changeCoveragePremiumType from './changeCoveragePremiumType';
import changeCoverageWithdrawalTerm from './changeCoverageWithdrawalTerm';
import changeInitialPaymentMethod from './changeInitialPaymentMethod';
import changeFacType from './changeFacType';
import changeAllPolicyPayment from './changeAllPolicyPayment';
import { formUtils } from 'basic/components/Form';
import changePrivateType from './changePrivateType';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;
  let nextState: any = produce(state, (draftState: any) => {
    lodash
      .chain(changedFields)
      .entries()
      .forEach((item) => {
        const [key, value] = item;
        if (lodash.has(extraDataSrouce, key)) {
          const sourcePath = lodash.get(extraDataSrouce, key);
          lodash.set(draftState, `businessData.${sourcePath}`, value);
          return;
        }

        lodash.set(draftState, `businessData.policyList[0].${key}`, value);
      })
      .value();
    lodash.set(draftState, 'stepsChange.PlanInfo', true);
  });
  if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'effectiveDate')) {
    lodash
      .chain(nextState)
      .get('businessData.policyList[0].clientInfoList', [])
      .map((item: any) => {
        const dateOfBirth = formUtils.queryValue(item?.dateOfBirth);
        const effectiveDate = formUtils.queryValue(changedFields?.effectiveDate);
        const customerAge = moment(effectiveDate).diff(moment(dateOfBirth), 'years');
        return {
          id: item?.id,
          customerAge,
        };
      })
      .forEach((item: any) => {
        const { customerAge, id } = lodash.pick(item, ['customerAge', 'id']);
        if (lodash.isNumber(customerAge)) {
          nextState = changeBasicInfoFields(nextState, {
            payload: {
              id,
              changedFields: {
                customerAge,
              },
            },
          });
        }
      })
      .value();
  }
  if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'premiumType')) {
    nextState = changeCoveragePremiumType(nextState, {
      payload: {
        changedFields,
      },
    });
  }
  if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'facType')) {
    nextState = changeFacType(nextState, {
      payload: {
        changedFields,
      },
    });
  }
  if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'withdrawalTerm')) {
    nextState = changeCoverageWithdrawalTerm(nextState, {
      payload: {
        changedFields,
      },
    });
  }
  if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'policyPayMode')) {
    nextState = changeAllPolicyPayment(nextState, {
      payload: {
        policyPayMode: changedFields?.policyPayMode,
      },
    });
  }
  if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'paymentOption')) {
    nextState = changeInitialPaymentMethod(nextState, {
      payload: {
        changedFields,
      },
    });
  }
  if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'privateFundFlag')) {
    nextState = changePrivateType(nextState, {
      payload: {
        changedFields,
      },
    });
  }
  return { ...nextState };
};
