import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import updatePayeePaymentMethod from './updatePayeePaymentMethod';
import updatePayeePayoutCurrency from './updatePayeePayoutCurrency';
import updatePayeePayByPolicyCurrency from './updatePayeePayByPolicyCurrency';
import updatePrintDestinationSelected from './updatePrintDestinationSelected';
import { getPayeeDicts, getPaymentMethodError } from '../../_function';

const savePayeeInfo = (state: any, { payload }: any = {}) => {
  const { changedFields, id } = payload;
  const payeeIndex: number = lodash.findIndex(state.claimData.payeeList, { id }) || 0;
  const payeeItem = state.claimData.payeeList[payeeIndex] || {};

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      const paymentMethod = {
        paymentMethod:
          lodash.has(changedFields, 'paymentMethod') &&
          lodash.includes(draftState.relatePolicyOwnerPayeeIds, payeeItem.id) &&
          payeeItem.id !== formUtils.queryValue(id)
            ? formUtils.queryValue(changedFields.paymentMethod)
            : payeeItem?.paymentMethod,
      };

      // eslint-disable-next-line no-param-reassign
      draftState.claimData.payeeList[payeeIndex] = {
        ...draftState.claimData.payeeList[payeeIndex],
        ...paymentMethod,
        ...changedFields,
        ...getPaymentMethodError({ changedFields, payeeItem }),
      };

      if (lodash.has(changedFields, 'firstName') || lodash.has(changedFields, 'surname')) {
        // eslint-disable-next-line no-param-reassign
        draftState.payeeDicts = getPayeeDicts(draftState.claimData.payeeList);
      }
    }
  });

  const configs = {
    paymentMethod: () => {
      return updatePayeePaymentMethod(nextState, {
        type: 'updatePayeePaymentMethod',
        payload: {
          payeeIndex,
          paymentMethod: formUtils.queryValue(changedFields.paymentMethod),
        },
      });
    },
    payoutCurrency: () => {
      return updatePayeePayoutCurrency(nextState, {
        type: 'updatePayeePayoutCurrency',
        payload: {
          payeeIndex,
        },
      });
    },
    payByPolicyCurrency: () => {
      return updatePayeePayByPolicyCurrency(nextState, {
        type: 'updatePayeePayByPolicyCurrency',
        payload: {
          payeeIndex,
          isPayByPolicyCurrency: formUtils.queryValue(changedFields.payByPolicyCurrency),
        },
      });
    },
    printDestinationSelected:()=>{
      return updatePrintDestinationSelected(nextState, {
        type: 'updatePrintDestinationSelected',
        payload: {
          payeeIndex,
          printDestinationSelected: formUtils.queryValue(changedFields.printDestinationSelected),
        },
      });
    }
  };

  if (lodash.size(changedFields) === 1) {
    const keys: any[] = lodash.keys(changedFields);
    if (lodash.isFunction(configs[keys[0]])) {
      return { ...configs?.[keys[0]]() };
    }
  }
  return { ...nextState };
};

export default savePayeeInfo;
