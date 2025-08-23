/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, changedFields, validating } = payload;
    const duplicatePolicyPath = `entities.transactionTypesMap[${transactionId}].duplicatePolicy`;
    draftState.entities.transactionTypesMap[transactionId].duplicatePolicy = {
      ...draftState.entities.transactionTypesMap[transactionId].duplicatePolicy,
      ...changedFields,
    };

    if (!validating) {
      if (lodash.hasIn(changedFields, 'timesOfReplacement')) {
        const newTimesOfReplacement =
          Number(formUtils.queryValue(changedFields?.timesOfReplacement)) <= 0
            ? 1
            : changedFields?.timesOfReplacement;

        const chargeFee =
          formUtils.queryValue(lodash.get(draftState, `${duplicatePolicyPath}.freeOfCharge`)) ===
            1 || formUtils.queryValue(newTimesOfReplacement) === 1
            ? 0
            : 200;

        lodash.set(draftState, `${duplicatePolicyPath}.timesOfReplacement`, newTimesOfReplacement);
        lodash.set(
          draftState,
          `${duplicatePolicyPath}.beforeChargeFee`,
          formUtils.queryValue(newTimesOfReplacement) === 1 ? 0 : 200
        );
        lodash.set(draftState, `${duplicatePolicyPath}.chargeFee`, chargeFee);
      }
      if (lodash.hasIn(changedFields, 'chargeFee')) {
        lodash.set(
          draftState,
          `${duplicatePolicyPath}.changeChargeFee`,
          formUtils.queryValue(changedFields?.chargeFee)
        );
      }

      if (lodash.hasIn(changedFields, 'freeOfCharge')) {
        lodash.set(
          draftState,
          `${duplicatePolicyPath}.chargeFee`,
          formUtils.queryValue(changedFields?.freeOfCharge) === 1
            ? 0
            : formUtils.queryValue(
                draftState.entities.transactionTypesMap[transactionId].duplicatePolicy
              ?.changeChargeFee) ||
              formUtils.queryValue(
                draftState.entities.transactionTypesMap[transactionId].duplicatePolicy
                  ?.changeChargeFee === 0
              )
            ? formUtils.queryValue(lodash.get(draftState, `${duplicatePolicyPath}.changeChargeFee`))
            : formUtils.queryValue(lodash.get(draftState, `${duplicatePolicyPath}.beforeChargeFee`))
        );
      }
    }
    if (lodash.hasIn(changedFields, 'freeOfCharge')) {
      lodash.set(
        draftState,
        `${duplicatePolicyPath}.freeOfCharge`,
        formUtils.queryValue(changedFields?.freeOfCharge) === 1 ? 'Y' : 'N'
      );
    }
    draftState.entities.transactionTypesMap[transactionId].chargeFee = formUtils.queryValue(
      lodash.get(draftState, `${duplicatePolicyPath}.chargeFee`)
    );
    draftState.entities.transactionTypesMap[transactionId].feeCurrency = formUtils.queryValue(
      lodash.get(draftState, `${duplicatePolicyPath}.feeCurrency`)
    );
  });
