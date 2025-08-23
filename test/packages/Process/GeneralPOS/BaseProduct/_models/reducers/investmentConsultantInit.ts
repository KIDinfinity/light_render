/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { StateSectionEnum } from 'process/GeneralPOS/common/Enum';
import { defaultOptionByRegion } from 'process/GeneralPOS/common/utils';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;

    if (
      lodash.isEmpty(draftState.entities.transactionTypesMap[transactionId].investmentConsultant)
    ) {
      draftState.entities.transactionTypesMap[transactionId].investmentConsultant = {
        requester: defaultOptionByRegion(StateSectionEnum.INVESTMENTCONSULTANT),
        validICInformation: 'N',
      };
    }
  });
