/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { StateSectionEnum } from 'process/GeneralPOS/common/Enum';
import { defaultOptionByRegion } from 'process/GeneralPOS/common/utils';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, transactionId } = payload;

    if (!draftState.entities.transactionTypesMap[transactionId].investmentConsultant) {
      draftState.entities.transactionTypesMap[transactionId].investmentConsultant = {
        requester: defaultOptionByRegion(StateSectionEnum.INVESTMENTCONSULTANT),
      };
    }
    draftState.entities.transactionTypesMap[transactionId].investmentConsultant = {
      ...draftState.entities.transactionTypesMap[transactionId]?.investmentConsultant,
      ...changedFields,
    };
    if (lodash.hasIn(changedFields, 'validICInformation')) {
      const [value] = Object.values(formUtils.cleanValidateData(changedFields.validICInformation));

      draftState.entities.transactionTypesMap[transactionId].investmentConsultant = {
        ...draftState.entities.transactionTypesMap[transactionId].investmentConsultant,
        validICInformation: value === 1 ? 'Y' : 'N',
      };
    }
  });
